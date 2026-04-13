import { PaymentStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class SimulatePaymentDto {
  @IsUUID()
  orderId!: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsEnum(PaymentStatus)
  status!: PaymentStatus;
}
