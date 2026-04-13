import { OrderStatus, PaymentStatus } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SimulatePaymentDto } from './dto/simulate-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async simulatePayment(customerId: string, simulatePaymentDto: SimulatePaymentDto) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: simulatePaymentDto.orderId,
        customerId,
      },
      select: {
        id: true,
        total: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const payment = await this.prisma.$transaction(async (tx) => {
      const createdPayment = await tx.paymentRecord.create({
        data: {
          orderId: order.id,
          customerId,
          amount: order.total,
          method: simulatePaymentDto.method ?? 'SIMULATED',
          status: simulatePaymentDto.status,
        },
      });

      await tx.order.update({
        where: { id: order.id },
        data: {
          status: simulatePaymentDto.status === PaymentStatus.SUCCESS ? OrderStatus.CONFIRMED : OrderStatus.PENDING,
        },
      });

      return createdPayment;
    });

    return {
      id: payment.id,
      orderId: payment.orderId,
      amount: Number(payment.amount),
      method: payment.method,
      status: payment.status,
      createdAt: payment.createdAt,
    };
  }

  async listOrderPayments(customerId: string, orderId: string) {
    const payments = await this.prisma.paymentRecord.findMany({
      where: {
        customerId,
        orderId,
      },
      orderBy: { createdAt: 'desc' },
    });

    return payments.map((payment) => ({
      id: payment.id,
      orderId: payment.orderId,
      amount: Number(payment.amount),
      method: payment.method,
      status: payment.status,
      createdAt: payment.createdAt,
    }));
  }
}
