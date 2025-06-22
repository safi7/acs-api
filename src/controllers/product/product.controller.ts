import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CategoryCreateDto, ProductCreateDto } from 'src/common/dto/category.dto';
import { categoryResponseInterface } from 'src/common/interfaces/category.interface';
import { productResponseInterface } from 'src/common/interfaces/product.interface';
import mainConfig from 'src/configs/main.config';
import { ProductCategoryService } from 'src/services/product/category.service';
import { ProductService } from 'src/services/product/product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productCategoryS: ProductCategoryService,
    private productS: ProductService
  ) {}

  @Get('category/all')
  async getCategories(): Promise<categoryResponseInterface[]> {
    const categories = await this.productCategoryS.findAll();
    return categories.map((v) => ({ ...v, imageUrl: `${mainConfig.api_url}/${v.imageUrl}` }));
  }

  @Post('category/create')
  async createCategories(@Body() params: CategoryCreateDto): Promise<categoryResponseInterface> {
    try {
      const category = await this.productCategoryS.create(params);
      return {
        id: category.id,
        title: category.title,
        description: category.description,
        slug: category.slug,
        imageUrl: category.imageUrl,
        createdAt: category.createdAt
      };
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_create_a_record', HttpStatus.BAD_GATEWAY);
    }
  }

  @Get('/all')
  async getProducts(): Promise<productResponseInterface[]> {
    const products = await this.productS.findAll();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      fullDescription: product.fullDescription,
      shortDescription: product.shortDescription,
      categorySlug: product.categorySlug,
      imageUrl: product.imageUrl,
      manufacturer: product.manufacturer,
      certifications: `${product.certifications}`.split(','),
      specifications: JSON.parse(product.specifications ?? '{}'),
      createdAt: product.createdAt
    }));
  }

  @Post('/create')
  async createProduct(@Body() params: ProductCreateDto): Promise<productResponseInterface> {
    try {
      const product = await this.productS.create(params);
      return {
        id: product.id,
        name: product.name,
        fullDescription: product.fullDescription,
        shortDescription: product.shortDescription,
        categorySlug: product.categorySlug,
        imageUrl: product.imageUrl,
        manufacturer: product.manufacturer,
        certifications: `${product.certifications}`.split(','),
        specifications: JSON.parse(product.specifications ?? '{}'),
        createdAt: product.createdAt
      };
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_create_a_record', HttpStatus.BAD_GATEWAY);
    }
  }
}
