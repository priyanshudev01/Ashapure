import { OrderStatus, Prisma } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

type OrderResponse = {
  id: string;
  status: OrderStatus;
  address: string | null;
  deliverySlot: string | null;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: Date;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
};

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(customerId: string, createOrderDto: CreateOrderDto): Promise<OrderResponse> {
    const productIds = [...new Set(createOrderDto.items.map((item) => item.productId))];

    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more products are unavailable');
    }

    const productById = new Map(products.map((product) => [product.id, product]));
    const merchantIds = [...new Set(products.map((product) => product.merchantId).filter(Boolean))];

    if (merchantIds.length > 1) {
      throw new BadRequestException('Cart items must belong to a single merchant');
    }

    const orderItemsData = createOrderDto.items.map((item) => {
      const product = productById.get(item.productId);

      if (!product) {
        throw new BadRequestException(`Product not found: ${item.productId}`);
      }

      if (item.quantity > product.stock) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`);
      }

      const unitPrice = Number(product.price);
      const lineTotal = unitPrice * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        lineTotal,
      };
    });

    const subtotal = orderItemsData.reduce((sum, item) => sum + item.lineTotal, 0);
    const deliveryFee = 0;
    const discount = 0;
    const total = subtotal + deliveryFee - discount;
    const merchantId = merchantIds.length === 1 ? merchantIds[0] : null;

    const order = await this.prisma.$transaction(async (tx) => {
      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return tx.order.create({
        data: {
          customerId,
          merchantId,
          address: createOrderDto.address,
          deliverySlot: createOrderDto.deliverySlot,
          subtotal,
          deliveryFee,
          discount,
          total,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });

    return this.toOrderResponse(order);
  }

  async getCustomerOrders(customerId: string): Promise<OrderResponse[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) => this.toOrderResponse(order));
  }

  async getCustomerOrderById(customerId: string, orderId: string): Promise<OrderResponse> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        customerId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.toOrderResponse(order);
  }

  private toOrderResponse(
    order: Prisma.OrderGetPayload<{
      include: {
        items: {
          include: {
            product: true;
          };
        };
      };
    }>,
  ): OrderResponse {
    return {
      id: order.id,
      status: order.status,
      address: order.address,
      deliverySlot: order.deliverySlot,
      subtotal: Number(order.subtotal),
      deliveryFee: Number(order.deliveryFee),
      discount: Number(order.discount),
      total: Number(order.total),
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        lineTotal: Number(item.lineTotal),
      })),
    };
  }
}
