import { ApprovalStatus, UserRole } from '@prisma/client';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateApprovalDto } from './dto/update-approval.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async listPendingApprovals(role: UserRole) {
    const approvableRoles: UserRole[] = [UserRole.MERCHANT, UserRole.DELIVERY];

    if (!approvableRoles.includes(role)) {
      throw new UnprocessableEntityException('Only MERCHANT or DELIVERY approvals are supported');
    }

    return this.prisma.user.findMany({
      where: {
        role,
        approvalStatus: ApprovalStatus.PENDING,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        approvalStatus: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async updateApproval(userId: string, updateApprovalDto: UpdateApprovalDto) {
    if (updateApprovalDto.status === ApprovalStatus.PENDING) {
      throw new UnprocessableEntityException('Approval status cannot be set to PENDING');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const approvableRoles: UserRole[] = [UserRole.MERCHANT, UserRole.DELIVERY];

    if (!approvableRoles.includes(user.role)) {
      throw new UnprocessableEntityException('Only merchant or delivery users can be approved');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        approvalStatus: updateApprovalDto.status,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        approvalStatus: true,
      },
    });
  }

  async listOrders() {
    const orders = await this.prisma.order.findMany({
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

    return orders.map((order) => ({
      id: order.id,
      customer: order.customer,
      merchantId: order.merchantId,
      status: order.status,
      total: Number(order.total),
      createdAt: order.createdAt,
    }));
  }
}
