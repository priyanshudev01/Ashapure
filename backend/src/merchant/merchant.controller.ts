import { UserRole } from '@prisma/client';
import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtPayload } from '../auth/types/auth.types';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MerchantService } from './merchant.service';

type AuthenticatedRequest = Request & {
  user: JwtPayload;
};

@Controller('merchant')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.MERCHANT)
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Get('products')
  listProducts(@Req() req: AuthenticatedRequest) {
    return this.merchantService.listProducts(req.user.sub);
  }

  @Post('products')
  createProduct(@Req() req: AuthenticatedRequest, @Body() createProductDto: CreateProductDto) {
    return this.merchantService.createProduct(req.user.sub, createProductDto);
  }

  @Patch('products/:productId')
  updateProduct(
    @Req() req: AuthenticatedRequest,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.merchantService.updateProduct(req.user.sub, productId, updateProductDto);
  }

  @Patch('products/:productId/inventory')
  updateInventory(
    @Req() req: AuthenticatedRequest,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.merchantService.updateInventory(req.user.sub, productId, updateInventoryDto);
  }

  @Get('orders')
  listOrders(@Req() req: AuthenticatedRequest) {
    return this.merchantService.listOrders(req.user.sub);
  }

  @Patch('orders/:orderId/status')
  updateOrderStatus(
    @Req() req: AuthenticatedRequest,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.merchantService.updateOrderStatus(req.user.sub, orderId, updateOrderStatusDto);
  }

  @Get('earnings')
  getEarnings(@Req() req: AuthenticatedRequest) {
    return this.merchantService.getEarnings(req.user.sub);
  }
}
