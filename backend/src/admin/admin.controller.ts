import { UserRole } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { UpdateApprovalDto } from './dto/update-approval.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('approvals')
  listPendingApprovals(@Query('role') role: string) {
    if (role !== UserRole.MERCHANT && role !== UserRole.DELIVERY) {
      throw new UnprocessableEntityException('Query "role" must be MERCHANT or DELIVERY');
    }

    return this.adminService.listPendingApprovals(role);
  }

  @Patch('approvals/:userId')
  updateApproval(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateApprovalDto: UpdateApprovalDto,
  ) {
    return this.adminService.updateApproval(userId, updateApprovalDto);
  }

  @Get('orders')
  listOrders() {
    return this.adminService.listOrders();
  }
}
