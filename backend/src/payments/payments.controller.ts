import { UserRole } from '@prisma/client';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtPayload } from '../auth/types/auth.types';
import { SimulatePaymentDto } from './dto/simulate-payment.dto';
import { PaymentsService } from './payments.service';

type AuthenticatedRequest = Request & {
  user: JwtPayload;
};

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CUSTOMER)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('simulate')
  simulatePayment(@Req() req: AuthenticatedRequest, @Body() simulatePaymentDto: SimulatePaymentDto) {
    return this.paymentsService.simulatePayment(req.user.sub, simulatePaymentDto);
  }

  @Get('order/:orderId')
  listOrderPayments(@Req() req: AuthenticatedRequest, @Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.paymentsService.listOrderPayments(req.user.sub, orderId);
  }
}
