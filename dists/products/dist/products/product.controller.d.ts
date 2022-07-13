import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly products;
    constructor(products: ProductService);
    index(data?: any): Promise<{
        products: any;
        more: boolean;
    }>;
    search(data?: any): Promise<{
        products: any;
        more: boolean;
    }>;
    store(data: any): Promise<{
        product: any;
        success: any;
    }>;
    update(data: any): Promise<{
        product: any;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        product?: undefined;
        success?: undefined;
    }>;
    show(data: any): Promise<{
        product: any;
    }>;
    addMany(data: any): Promise<void>;
    uprev(data: any): Promise<{
        product: any;
    }>;
    getByPrice2(data: any): Promise<boolean>;
    fetchProductsByIds({ ids, select }: {
        ids: any;
        select?: any;
    }): Promise<any>;
    fetchProductsByIds2(data: any): Promise<any>;
    handleOrderDeleted(products: any): Promise<void>;
    handleOrderCreated(products: any): Promise<void>;
    destroy({ id, user_id }: {
        id: string;
        user_id: string;
    }): Promise<{
        product: ProductEntity;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        product?: undefined;
        success?: undefined;
    }>;
    upQty(data: any): Promise<{
        product: any;
    }>;
}
