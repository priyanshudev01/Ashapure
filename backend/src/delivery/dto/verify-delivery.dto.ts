import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class VerifyDeliveryDto {
  @IsBoolean()
  passed!: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
