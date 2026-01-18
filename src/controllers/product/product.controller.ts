import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Delete, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { categoryResponseInterface } from 'src/common/interfaces/category.interface';
import { ProductResponseInterface, ProductSpecificationInterface } from 'src/common/interfaces/product.interface';
import mainConfig from 'src/configs/main.config';
import { ProductCategoryService } from 'src/services/product/category.service';
import { ProductService } from 'src/services/product/product.service';
import { ProductSpecificationService } from 'src/services/product/product-specification.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileUploadInterceptor } from 'src/common/interceptors/file-upload.interceptor';

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
    return categories.map((v) => ({
      ...v,
      hasProducts: v.hasProducts,
      imageUrl: `${mainConfig.api_url}/${v.imageUrl}?v=${version}`
    }));
  }

  @Post('category/create')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileUploadInterceptor)
  async createCategories(@Request() req: any): Promise<categoryResponseInterface> {
    try {
      const fileData = (req as any).fileData;
      if (!fileData) {
        throw new HttpException('Image file is required', HttpStatus.BAD_REQUEST);
      }

      // Get form fields from multipart data
      const title = req.body?.title;
      const description = req.body?.description;
      const slug = req.body?.slug;

      if (!title || !description || !slug) {
        throw new HttpException('Title, description, and slug are required', HttpStatus.BAD_REQUEST);
      }

      const category = await this.productCategoryS.createWithFile(
        fileData.buffer,
        slug,
        title,
        description
      );

      return {
        id: category.id,
        title: category.title,
        description: category.description,
        slug: category.slug,
        hasProducts: category.hasProducts,
        imageUrl: `${mainConfig.api_url}/${category.imageUrl}`,
        createdAt: category.createdAt
      };
    } catch (err) {
      console.error('err', err);
      if (err instanceof HttpException) {
        throw err;
      }
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
  @UseGuards(AuthGuard)
  @UseInterceptors(FileUploadInterceptor)
  async createProduct(@Request() req: any): Promise<ProductResponseInterface> {
    try {
      const fileData = (req as any).fileData;
      if (!fileData) {
        throw new HttpException('Image file is required', HttpStatus.BAD_REQUEST);
      }

      // Get form fields from multipart data
      const name = req.body?.name;
      const slug = req.body?.slug;
      const categorySlug = req.body?.categorySlug;
      const shortDescription = req.body?.shortDescription;
      const manufacturer = req.body?.manufacturer;
      const certifications = req.body?.certifications;
      const specifications = req.body?.specifications ? JSON.parse(req.body.specifications) : undefined;

      if (!name || !slug || !categorySlug) {
        throw new HttpException('Name, slug, and categorySlug are required', HttpStatus.BAD_REQUEST);
      }

      const product = await this.productS.createWithFile(
        fileData.buffer,
        slug,
        {
          name,
          slug,
          categorySlug,
          shortDescription,
          manufacturer,
          certifications,
          specifications
        }
      );

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        manufacturer: product.manufacturer,
        certifications: product.certifications,
        categorySlug: product.categorySlug,
        imageUrl: `${mainConfig.api_url}/${product.imageUrl}`,
        specifications: this.processSpecifications(product.specifications || {}, product.slug),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      };
    } catch (err) {
      console.error('err', err);
      if (err instanceof HttpException) {
        throw err;
      }
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

  @Delete('/category/:slug')
  @UseGuards(AuthGuard)
  async deleteCategory(@Param('slug') slug: string): Promise<{ status: string; message: string }> {
    try {
      await this.productCategoryS.delete(slug);
      return { 
        status: 'success',
        message: 'Category deleted successfully'
      };
    } catch (err) {
      console.error('Delete category error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Could not delete category';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('slug') slug: string): Promise<{ status: string; message: string }> {
    try {
      await this.productS.delete(slug);
      return { 
        status: 'success',
        message: 'Product deleted successfully'
      };
    } catch (err) {
      console.error('Delete product error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Could not delete product';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/specifications/:id')
  @UseGuards(AuthGuard)
  async deleteProductSpecification(@Param('id') id: string): Promise<{ status: string; message: string }> {
    try {
      await this.productSpecificationS.delete(+id);
      return { 
        status: 'success',
        message: 'Specification deleted successfully'
      };
    } catch (err) {
      console.error('Delete specification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Could not delete specification';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
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
