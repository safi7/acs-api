import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CategoryCreateDto, ProductCreateDto } from 'src/common/dto/category.dto';
import { categoryResponseInterface } from 'src/common/interfaces/category.interface';
import { ProductResponseInterface, ProductSpecificationInterface } from 'src/common/interfaces/product.interface';
import mainConfig from 'src/configs/main.config';
import { ProductCategoryService } from 'src/services/product/category.service';
import { ProductService } from 'src/services/product/product.service';
import { ProductSpecificationService } from 'src/services/product/product-specification.service';

@Controller('product')
export class ProductController {
  constructor(
    private productCategoryS: ProductCategoryService,
    private productS: ProductService,
    private productSpecificationS: ProductSpecificationService
  ) {}

  @Get('category/all')
  async getCategories(): Promise<categoryResponseInterface[]> {
    const version = 2;
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
    const version = 2;
    const products = await this.productS.findAll();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      manufacturer: product.manufacturer,
      certifications: product.certifications,
      categorySlug: product.categorySlug,
      imageUrl: `${mainConfig.api_url}/media/products/${product.slug}.webp?v=${version}`,
      specifications: this.processSpecifications(product.specifications || {}, product.slug),
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
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      manufacturer: product.manufacturer,
      certifications: product.certifications,
      categorySlug: product.categorySlug,
      imageUrl: `${mainConfig.api_url}/media/products/${product.slug}.webp`,
      specifications: this.processSpecifications(product.specifications || {}, product.slug),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }

  @Post('/create')
  async createProduct(@Body() params: ProductCreateDto): Promise<ProductResponseInterface> {
    try {
      // Don't store imageUrl in database, generate it dynamically
      const { imageUrl, ...productData } = params;
      const product = await this.productS.create(productData);
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        manufacturer: product.manufacturer,
        certifications: product.certifications,
        categorySlug: product.categorySlug,
        imageUrl: `${mainConfig.api_url}/media/products/${product.slug}.webp`,
        specifications: this.processSpecifications(product.specifications || {}, product.slug),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      };
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_create_a_record', HttpStatus.BAD_GATEWAY);
    }
  }

  @Get('/specifications/all')
  async getProductSpecifications(): Promise<ProductSpecificationInterface[]> {
    return this.productSpecificationS.findAll();
  }

  @Post('/specifications/create')
  async createProductSpecification(@Body() params: Partial<ProductSpecificationInterface>): Promise<ProductSpecificationInterface> {
    try {
      return await this.productSpecificationS.create(params);
    } catch (err) {
      console.error('err', err);
      throw new HttpException(err.message || 'could_not_create_specification', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Process product specifications to create proper URLs for needle_type_url and complete_sheet
   * These fields are stored as filenames/paths and need to be converted to full URLs
   */
  private processSpecifications(specifications: any, productSlug: string): any {
    if (!specifications || typeof specifications !== 'object') {
      return specifications;
    }

    const processed = { ...specifications };

    console.log('processed', processed);
    // Create URL for needle_type_url if it exists
    if (processed.needle_type_url && typeof processed.needle_type_url === 'string') {
        processed.needle_type_url = `${mainConfig.api_url}/media/products/needle-type/Needle-type.pdf`;
    }

    // Create URL for complete_sheet if it exists
    if (processed.complete_sheet && typeof processed.complete_sheet === 'string') {
        processed.complete_sheet = `${mainConfig.api_url}/media/products/complete-sheet/${productSlug}.pdf`;
    }

    return processed;
  }
}
