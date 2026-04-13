import { ApprovalStatus, OrderStatus, Prisma, UserRole } from '@prisma/client';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class MerchantService {
  constructor(private readonly prisma: PrismaService) {}

  async listProducts(merchantId: string) {
    await this.assertApprovedMerchant(merchantId);

    const products = await this.prisma.product.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
    });

    return products.map((product) => this.toProductResponse(product));
  }

  async createProduct(merchantId: string, createProductDto: CreateProductDto) {
    await this.assertApprovedMerchant(merchantId);

    const product = await this.prisma.product.create({
      data: {
        merchantId,
        name: createProductDto.name,
        description: createProductDto.description,
        category: createProductDto.category,
        price: createProductDto.price,
        unit: createProductDto.unit,
        stock: createProductDto.stock,
        imageUrl: createProductDto.imageUrl,
      },
    });

    return this.toProductResponse(product);
  }

  async updateProduct(merchantId: string, productId: string, updateProductDto: UpdateProductDto) {
    await this.assertApprovedMerchant(merchantId);
    await this.ensureProductOwnedByMerchant(merchantId, productId);

    const product = await this.prisma.product.update({
      where: { id: productId },
      data: updateProductDto,
    });

    return this.toProductResponse(product);
  }

  async updateInventory(merchantId: string, productId: string, updateInventoryDto: UpdateInventoryDto) {
    await this.assertApprovedMerchant(merchantId);
    await this.ensureProductOwnedByMerchant(merchantId, productId);

    const product = await this.prisma.product.update({
      where: { id: productId },
      data: {
        stock: updateInventoryDto.stock,
      },
    });

    return this.toProductResponse(product);
  }

  async listOrders(merchantId: string) {
    await this.assertApprovedMerchant(merchantId);

    const orders = await this.prisma.order.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      id: order.id,
      status: order.status,
      total: Number(order.total),
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        lineTotal: Number(item.lineTotal),
      })),
    }));
  }

  async updateOrderStatus(merchantId: string, orderId: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    await this.assertApprovedMerchant(merchantId);

    const allowedStatuses: OrderStatus[] = [OrderStatus.CONFIRMED, OrderStatus.CANCELLED];

    if (!allowedStatuses.includes(updateOrderStatusDto.status)) {
      throw new UnprocessableEntityException('Merchants can only mark order as CONFIRMED or CANCELLED');
    }

    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        merchantId,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found for this merchant');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: updateOrderStatusDto.status },
    });

    return {
      id: updatedOrder.id,
      status: updatedOrder.status,
      total: Number(updatedOrder.total),
    };
  }

  async getEarnings(merchantId: string) {
    await this.assertApprovedMerchant(merchantId);

    const completedOrders = await this.prisma.order.findMany({
      where: {
        merchantId,
        status: {
          in: [OrderStatus.CONFIRMED, OrderStatus.DELIVERED],
        },
      },
      select: {
        id: true,
        total: true,
      },
    });

    const totalEarnings = completedOrders.reduce((sum, order) => sum + Number(order.total), 0);

    return {
      totalEarnings,
      completedOrders: completedOrders.length,
    };
  }

  private async assertApprovedMerchant(merchantId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: merchantId },
      select: {
        id: true,
        role: true,
        approvalStatus: true,
      },
    });

    if (!user || user.role !== UserRole.MERCHANT) {
      throw new ForbiddenException('Merchant access required');
    }

    if (user.approvalStatus !== ApprovalStatus.APPROVED) {
      throw new ForbiddenException('Merchant account pending admin approval');
    }
  }

  private async ensureProductOwnedByMerchant(merchantId: string, productId: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        merchantId,
      },
      select: { id: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found for this merchant');
    }
  }

  private toProductResponse(product: Prisma.ProductGetPayload<{}>) {
    return {
      id: product.id,
      merchantId: product.merchantId,
      name: product.name,
      description: product.description,
      category: product.category,
      price: Number(product.price),
      unit: product.unit,
      stock: product.stock,
      imageUrl: product.imageUrl,
      isActive: product.isActive,
    };
  }
}
