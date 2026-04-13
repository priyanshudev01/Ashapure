import { UserRole } from '@prisma/client';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtPayload } from '../auth/types/auth.types';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

type AuthenticatedRequest = Request & {
  user: JwtPayload;
};

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CUSTOMER)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Req() req: AuthenticatedRequest, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.sub, createOrderDto);
  }

  @Get()
  getCustomerOrders(@Req() req: AuthenticatedRequest) {
    return this.ordersService.getCustomerOrders(req.user.sub);
  }

  @Get(':orderId')
  getCustomerOrderById(@Req() req: AuthenticatedRequest, @Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getCustomerOrderById(req.user.sub, orderId);
  }
}
