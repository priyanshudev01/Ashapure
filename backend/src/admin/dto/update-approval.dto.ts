import { ApprovalStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateApprovalDto {
  @IsEnum(ApprovalStatus)
  status!: ApprovalStatus;
}
