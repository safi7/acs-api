import { CategoryCreateDto, ProductCreateDto } from 'src/common/dto/category.dto';
import { categoryResponseInterface } from 'src/common/interfaces/category.interface';
import { ProductResponseInterface } from 'src/common/interfaces/product.interface';
import { ProductCategoryService } from 'src/services/product/category.service';
import { ProductService } from 'src/services/product/product.service';
export declare class ProductController {
    private productCategoryS;
    private productS;
    constructor(productCategoryS: ProductCategoryService, productS: ProductService);
    getCategories(): Promise<categoryResponseInterface[]>;
    createCategories(params: CategoryCreateDto): Promise<categoryResponseInterface>;
    getProducts(): Promise<ProductResponseInterface[]>;
    getProduct(slug: string): Promise<ProductResponseInterface>;
    createProduct(params: ProductCreateDto): Promise<ProductResponseInterface>;
}
