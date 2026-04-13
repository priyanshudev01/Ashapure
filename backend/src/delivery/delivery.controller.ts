import { UserRole } from '@prisma/client';
import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtPayload } from '../auth/types/auth.types';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
import { VerifyDeliveryDto } from './dto/verify-delivery.dto';
import { DeliveryService } from './delivery.service';

type AuthenticatedRequest = Request & {
  user: JwtPayload;
};

@Controller('delivery')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DELIVERY)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('tasks')
  listTasks(@Req() req: AuthenticatedRequest) {
    return this.deliveryService.listTasks(req.user.sub);
  }

  @Patch('tasks/:orderId/accept')
  acceptTask(@Req() req: AuthenticatedRequest, @Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.deliveryService.acceptTask(req.user.sub, orderId);
  }

  @Patch('tasks/:orderId/status')
  updateTaskStatus(
    @Req() req: AuthenticatedRequest,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() updateStatusDto: UpdateDeliveryStatusDto,
  ) {
    return this.deliveryService.updateTaskStatus(req.user.sub, orderId, updateStatusDto);
  }

  @Patch('tasks/:orderId/verification')
  verifyTask(
    @Req() req: AuthenticatedRequest,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() verifyDeliveryDto: VerifyDeliveryDto,
  ) {
    return this.deliveryService.verifyTask(req.user.sub, orderId, verifyDeliveryDto);
  }

  @Get('earnings')
  getEarnings(@Req() req: AuthenticatedRequest) {
    return this.deliveryService.getEarnings(req.user.sub);
  }
}
