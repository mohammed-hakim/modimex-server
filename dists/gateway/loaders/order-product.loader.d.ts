import { ProductDTO } from '@commerce/shared';
import DataLoader = require('dataloader');
import { IDataLoader } from '../contracts/nest-dataloader';
import { ProductService } from '../products/product.service';
export declare class OrderProductDataLoader implements IDataLoader<string, ProductDTO> {
    private readonly dataLoader;
    constructor(dataLoader: DataLoader<any, any>);
    static create(productService: ProductService): Promise<OrderProductDataLoader>;
    load(id: string): Promise<any>;
    loadMany(products: any[]): Promise<any[]>;
}
