import { OrderStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateDeliveryStatusDto {
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
