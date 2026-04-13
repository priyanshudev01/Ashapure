import { UserRole } from '@prisma/client';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtPayload } from '../auth/types/auth.types';
import { ProductsService } from './products.service';

type AuthenticatedRequest = Request & {
  user: JwtPayload;
};

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  listProducts(@Req() req: AuthenticatedRequest) {
    return this.productsService.listProducts(req.user.role);
  }
}
