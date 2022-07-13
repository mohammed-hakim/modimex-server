import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
export declare class ProductService {
    private readonly Prods;
    private client;
    constructor(Prods: Repository<ProductEntity>);
    get(data: any): Promise<{
        products: any;
        more: boolean;
    }>;
    getByPrice(price: any): Promise<boolean>;
    search(data: any): Promise<{
        products: any;
        more: boolean;
    }>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
    fetchProductsByIds(ids: any, select: any): Promise<any>;
    fetchProductsByIdsSELECT({ ids, select }: {
        ids: any;
        select: any;
    }): Promise<any>;
    store(data: any): Promise<{
        product: any;
        success: any;
    }>;
    addMany(data: any): Promise<void>;
    updateREV({ id, rate }: {
        id: any;
        rate: any;
    }): Promise<{
        product: any;
    }>;
    updateQty({ id, op, quantity }: {
        id: any;
        op: any;
        quantity: any;
    }): Promise<{
        product: any;
    }>;
    update(id: string, data: any, user_id: string): Promise<{
        product: any;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        product?: undefined;
        success?: undefined;
    }>;
    show({ id, select }: {
        id: any;
        select: any;
    }): Promise<{
        product: any;
    }>;
    destroy(id: string, user_id: string): Promise<{
        product: ProductEntity;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        product?: undefined;
        success?: undefined;
    }>;
    destroyEver(id: string, user_id: string): Promise<{
        product: ProductEntity;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        product?: undefined;
        success?: undefined;
    }>;
    decrementProductsStock({ products, property }: {
        products: any;
        property?: string;
    }): Promise<void>;
    incrementProductsStock({ products, property }: {
        products: any;
        property?: string;
    }): Promise<void>;
    transf(data: any): any;
    transfS(data: any): any;
    create_idx(): Promise<void>;
}
