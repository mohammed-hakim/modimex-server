import { ProductDTO } from '@commerce/shared';
import { CreateProduct } from '@commerce/shared';
export declare class ProductService {
    private client;
    addMany(data: any): Promise<ProductDTO>;
    get_mine(data: any): Promise<ProductDTO[]>;
    storeRedis(keyData: any, msg: any): Promise<unknown>;
    show(data: any): Promise<ProductDTO>;
    get(data: any): Promise<unknown>;
    search(data: any): Promise<unknown>;
    store(data: CreateProduct, id: string): Promise<ProductDTO>;
    update(data: CreateProduct, productId: string, id: string): Promise<ProductDTO>;
    fetchProductsByIds(ids: any, select?: any): Promise<any>;
    fetchProductsByIdsSELECT(ids: any, select: any): Promise<any>;
    destroy(productId: string, id: string): Promise<unknown>;
}
