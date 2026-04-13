import { ApprovalStatus, OrderStatus, UserRole } from '@prisma/client';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
import { VerifyDeliveryDto } from './dto/verify-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  async listTasks(deliveryId: string) {
    await this.assertApprovedDelivery(deliveryId);

    const tasks = await this.prisma.order.findMany({
      where: {
        OR: [
          { status: OrderStatus.CONFIRMED, deliveryId: null },
          {
            deliveryId,
            status: {
              in: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED],
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return tasks.map((task) => ({
      id: task.id,
      status: task.status,
      customer: task.customer,
      address: task.address,
      deliverySlot: task.deliverySlot,
      total: Number(task.total),
      verificationPassed: task.verificationPassed,
      verificationNote: task.verificationNote,
      createdAt: task.createdAt,
    }));
  }

  async acceptTask(deliveryId: string, orderId: string) {
    await this.assertApprovedDelivery(deliveryId);

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        deliveryId: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.CONFIRMED || order.deliveryId) {
      throw new UnprocessableEntityException('Order is not available for assignment');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        deliveryId,
        status: OrderStatus.OUT_FOR_DELIVERY,
      },
      select: {
        id: true,
        status: true,
        deliveryId: true,
      },
    });
  }

  async updateTaskStatus(deliveryId: string, orderId: string, updateStatusDto: UpdateDeliveryStatusDto) {
    await this.assertApprovedDelivery(deliveryId);

    const allowedStatuses: OrderStatus[] = [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED];

    if (!allowedStatuses.includes(updateStatusDto.status)) {
      throw new UnprocessableEntityException('Delivery status must be OUT_FOR_DELIVERY or DELIVERED');
    }

    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        deliveryId,
      },
      select: { id: true },
    });

    if (!order) {
      throw new NotFoundException('Assigned delivery task not found');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: updateStatusDto.status,
      },
      select: {
        id: true,
        status: true,
      },
    });
  }

  async verifyTask(deliveryId: string, orderId: string, verifyDeliveryDto: VerifyDeliveryDto) {
    await this.assertApprovedDelivery(deliveryId);

    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        deliveryId,
      },
      select: { id: true, status: true },
    });

    if (!order) {
      throw new NotFoundException('Assigned delivery task not found');
    }

    if (order.status === OrderStatus.PENDING || order.status === OrderStatus.CONFIRMED) {
      throw new UnprocessableEntityException('Verification can only be logged after pickup');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        verificationPassed: verifyDeliveryDto.passed,
        verificationNote: verifyDeliveryDto.note ?? null,
      },
      select: {
        id: true,
        status: true,
        verificationPassed: true,
        verificationNote: true,
      },
    });
  }

  async getEarnings(deliveryId: string) {
    await this.assertApprovedDelivery(deliveryId);

    const completedTasks = await this.prisma.order.findMany({
      where: {
        deliveryId,
        status: OrderStatus.DELIVERED,
      },
      select: {
        id: true,
        total: true,
      },
    });

    const totalEarnings = completedTasks.reduce((sum, task) => sum + Number(task.total) * 0.15, 0);

    return {
      totalEarnings,
      completedDeliveries: completedTasks.length,
    };
  }

  private async assertApprovedDelivery(deliveryId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: deliveryId },
      select: {
        id: true,
        role: true,
        approvalStatus: true,
      },
    });

    if (!user || user.role !== UserRole.DELIVERY) {
      throw new ForbiddenException('Delivery access required');
    }

    if (user.approvalStatus !== ApprovalStatus.APPROVED) {
      throw new ForbiddenException('Delivery account pending admin approval');
    }
  }
}
