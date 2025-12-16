import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CategoryCreateDto, ProductCreateDto } from 'src/common/dto/category.dto';
import { categoryResponseInterface } from 'src/common/interfaces/category.interface';
import { ProductResponseInterface } from 'src/common/interfaces/product.interface';
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
    const version = 1;
    const categories = await this.productCategoryS.findAll();
    const hasProducts = ['medical-devices'];
    return categories.map((v) => ({
      ...v,
      hasProducts: hasProducts.includes(v.slug),
      imageUrl: `${mainConfig.api_url}/${v.imageUrl}?v=${version}`
    }));
  }

  @Post('category/create')
  async createCategories(@Body() params: CategoryCreateDto): Promise<categoryResponseInterface> {
    try {
      const category = await this.productCategoryS.create(params);
    const hasProducts = ['medical-devices'];
      return {
        id: category.id,
        title: category.title,
        description: category.description,
        slug: category.slug,
        hasProducts: hasProducts.includes(category.slug),
        imageUrl: category.imageUrl,
        createdAt: category.createdAt
      };
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_create_a_record', HttpStatus.BAD_GATEWAY);
    }
  }

  @Get('/all')
  async getProducts(): Promise<ProductResponseInterface[]> {
    const version = 1;
    const products = await this.productS.findAll();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      categorySlug: product.categorySlug,
      imageUrl: `${mainConfig.api_url}/media/products/${product.slug}.webp?v=${version}`,
      type: product.type,
      keyWords: product.keyWords,
      composition: product.composition,
      coating: product.coating,
      colour: product.colour,
      tissueReaction: product.tissueReaction,
      absorption: product.absorption,
      presentation: product.presentation,
      needleTypeUrl: product.needleTypeUrl ? `${mainConfig.api_url}/media/products/needle-type/Needle-type.pdf` : product.needleTypeUrl,
      completeSheet: product.completeSheet ? `${mainConfig.api_url}/media/products/complete-sheet/${product.slug}.pdf` : product.completeSheet,
      indications: product.indications,
      benefits: product.benefits,
      orderNumber: product.orderNumber,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));
  }

  @Get('/:slug')
  async getProduct(@Param('slug') slug: string): Promise<ProductResponseInterface> {
    const product = await this.productS.findOne(slug);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      categorySlug: product.categorySlug,
      imageUrl: `${mainConfig.api_url}/media/products/${product.slug}.webp`,
      type: product.type,
      keyWords: product.keyWords,
      composition: product.composition,
      coating: product.coating,
      colour: product.colour,
      tissueReaction: product.tissueReaction,
      absorption: product.absorption,
      presentation: product.presentation,
      needleTypeUrl: product.needleTypeUrl ? `${mainConfig.api_url}/media/products/needle-type/Needle-type.pdf` : product.needleTypeUrl,
      completeSheet: product.completeSheet ? `${mainConfig.api_url}/media/products/complete-sheet/${product.slug}.pdf` : product.completeSheet,
      indications: product.indications,
      benefits: product.benefits,
      orderNumber: product.orderNumber,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }

  @Post('/create')
  async createProduct(@Body() params: ProductCreateDto): Promise<ProductResponseInterface> {
    try {
      const product = await this.productS.create(params);
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        keyWords: product.keyWords,
        categorySlug: product.categorySlug,
        imageUrl: `${mainConfig.api_url}/media/products/${product.name}.webp`,
        type: product.type,
        composition: product.composition,
        coating: product.coating,
        colour: product.colour,
        tissueReaction: product.tissueReaction,
        absorption: product.absorption,
        presentation: product.presentation,
        needleTypeUrl: product.needleTypeUrl,
        completeSheet: product.completeSheet,
        indications: product.indications,
        benefits: product.benefits,
        orderNumber: product.orderNumber,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      };
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_create_a_record', HttpStatus.BAD_GATEWAY);
    }
  }
}
