import { ProductsDTO } from '@commerce/shared';
import DataLoader = require('dataloader');
import { IDataLoader } from '../contracts/nest-dataloader';
import { ProductService } from '../products/product.service';
export declare class ProductsDataLoader implements IDataLoader<string, ProductsDTO> {
    private readonly dataLoader;
    constructor(dataLoader: DataLoader<any, any>);
    static create(productsServ: ProductService): Promise<ProductsDataLoader>;
    load(id: string): Promise<any>;
    loadMany(products: any[]): Promise<any[]>;
}
export declare class ProductsDataLoaderSELECT implements IDataLoader<string, ProductsDTO> {
    private readonly dataLoader;
    constructor(dataLoader: DataLoader<any, any>);
    static create(productsServ: ProductService): Promise<ProductsDataLoader>;
    load(id: string): Promise<any>;
    loadMany(products: any[]): Promise<any[]>;
}
