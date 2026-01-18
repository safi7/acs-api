import { categoryResponseInterface } from 'src/common/interfaces/category.interface';
import { ProductResponseInterface, ProductSpecificationInterface } from 'src/common/interfaces/product.interface';
import { ProductCategoryService } from 'src/services/product/category.service';
import { ProductService } from 'src/services/product/product.service';
import { ProductSpecificationService } from 'src/services/product/product-specification.service';
export declare class ProductController {
    private productCategoryS;
    private productS;
    private productSpecificationS;
    constructor(productCategoryS: ProductCategoryService, productS: ProductService, productSpecificationS: ProductSpecificationService);
    getCategories(): Promise<categoryResponseInterface[]>;
    createCategories(req: any): Promise<categoryResponseInterface>;
    getProducts(): Promise<ProductResponseInterface[]>;
    getProduct(slug: string): Promise<ProductResponseInterface>;
    createProduct(req: any): Promise<ProductResponseInterface>;
    getProductSpecifications(): Promise<ProductSpecificationInterface[]>;
    createProductSpecification(params: Partial<ProductSpecificationInterface>): Promise<ProductSpecificationInterface>;
    deleteCategory(slug: string): Promise<{
        status: string;
        message: string;
    }>;
    deleteProduct(slug: string): Promise<{
        status: string;
        message: string;
    }>;
    deleteProductSpecification(id: string): Promise<{
        status: string;
        message: string;
    }>;
    private processSpecifications;
}
