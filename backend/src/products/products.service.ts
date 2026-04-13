import { Prisma, Product, UserRole } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type ProductResponse = {
  id: string;
  merchantId: string | null;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  unit: string;
  stock: number;
  imageUrl: string | null;
  isActive: boolean;
};

const defaultProductsSeed: Prisma.ProductCreateManyInput[] = [
  {
    name: 'A2 Desi Cow Milk',
    description: 'Premium farm-fresh A2 milk',
    category: 'Cow Milk',
    price: '95.00',
    unit: 'Litre',
    stock: 120,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8JcAG1G6lUnC1pZ8JYR9ZhwO1bZo7hiOLotf38CQGQYza5FaQTmLCzshEHbTklMUw8wMHHrZTZHvVjQ0odrEbcvWMSbM_DyrXB89Cuth6Zkf7YgWniaQRVpN3zvEMqzfECreHdN9rqGLR9Yn_1_aVwq5g0aVDh2Wr-L-vEgLyJqkYD-46egrOB1bycW56ruxUhYrM4GTvCewhQxQ5qzIVVZooN_8OD82Lm1XqcE-GkaQamkLZoW1EeEj4ZzfuFMbT-GagwbT4SBo',
    isActive: true,
  },
  {
    name: 'Organic Buffalo Milk',
    description: 'High protein buffalo milk',
    category: 'Buffalo Milk',
    price: '84.00',
    unit: 'Litre',
    stock: 95,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDK_LRCsKKhtmpDxrYtSvjzgt8eTWG-jg8LD_lUyTwORuXM9tK7-1H47UUP4QY2S403okedSGNGvpPIwQJVx72fB18KlIcRX3RVVXjSRtNTZH7eKhtVP2W0UR-vq9QPn0hwPLjiwO8Vo4FAxeJqIW2gqRgS5F40frSlI6yMqKqNeBawMNfh5A8vpd8dWFM7yjOEorcugpHdW4mB5r3J3HJihGI3NqWK_7INIHmEY2-mJH4kHpRPAUmKWuah082tdFB-hz9URgqvPjY',
    isActive: true,
  },
  {
    name: 'Bilona Cow Ghee',
    description: 'Artisan crafted bilona ghee',
    category: 'Ghee',
    price: '650.00',
    unit: '500ml',
    stock: 40,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApur9czWC60a4xwBeOdb3YATu44kQVISgE-9Bop_bXYr1rgoiA-b4OOn86LKK2HuJxEN5srsIGOg7rDVt7S6E0FGuqJnjMVhBpnxeNFVFoWYZotuOB39qV7-HoMAo0ETRHYZqbE0SGH5eBV-sBarsdNHXsZ9yigx_x7NtYZEkcbbQKrX_7VPjMLTqNvpJbDBXvc1lkt3ehd44lEUxzh1pEHsspO1wuOSppY28gmI9bzVeMow3BaOxi5u8tCw6_SIn1V8gh-dGpBfU',
    isActive: true,
  },
  {
    name: 'Thick Farm Curd',
    description: 'Daily probiotic curd',
    category: 'Curd',
    price: '45.00',
    unit: '400g',
    stock: 80,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtEE582cw8Up4vzwwfsV4UuVuh80twhai5PkV6omF9R3R6lTAhmapLlg22vjABnluCJVLDgAsfi2UE_2O0vMkMOxJI9_FILgteXWSho6zUoakqoqoqEGSdqHCVtO14PWwk7HIw6Sei2YcuLNjAy0fkDJzQKRHV1gR9HN8t2XUhdyDB2JCqdGMZEzXDev11vruaGYOqwMBlOGYdm2XPW08vKP3DBweY24qd7yiVw9RUh6MCwHapMSvzUdwhCQCBPMrvDds7iPc0II',
    isActive: true,
  },
];

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async listProducts(userRole: UserRole): Promise<ProductResponse[]> {
    if (userRole === UserRole.CUSTOMER) {
      await this.ensureSeedProducts();
    }

    const products = await this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return products.map((product) => this.toProductResponse(product));
  }

  private async ensureSeedProducts(): Promise<void> {
    const count = await this.prisma.product.count();

    if (count > 0) {
      return;
    }

    await this.prisma.product.createMany({
      data: defaultProductsSeed,
    });
  }

  private toProductResponse(product: Product): ProductResponse {
    return {
      id: product.id,
      merchantId: product.merchantId,
      name: product.name,
      description: product.description,
      category: product.category,
      price: Number(product.price),
      unit: product.unit,
      stock: product.stock,
      imageUrl: product.imageUrl,
      isActive: product.isActive,
    };
  }
}
