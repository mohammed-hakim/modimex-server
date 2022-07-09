import { Injectable } from '@nestjs/common';
import { ProductsDTO } from '@commerce/shared';
import DataLoader = require('dataloader');

import { IDataLoader } from '../contracts/nest-dataloader';
import { ProductService } from '../products/product.service';

@Injectable()
export class ProductsDataLoader implements IDataLoader<string, ProductsDTO> {
  constructor(private readonly dataLoader: DataLoader<any, any>) {}

  public static async create(
    productsServ: ProductService,
  ): Promise<ProductsDataLoader> {
    const dataloader = new DataLoader<string, ProductsDTO>(async (ids) => {
      let revs = await productsServ.fetchProductsByIds(ids as string[]);

      return ids.map((key) => {
        let dt = revs.find((entities) => {
          let ids = entities.map((x) => {
            return x.id;
          });

          return JSON.stringify(ids) == JSON.stringify(key);
        });

        return dt;
      });
    });
    return new ProductsDataLoader(dataloader);
  }
  public async load(id: string) {
    return await this.dataLoader.load(id);
  }
  public async loadMany(products: any[]) {
    return this.dataLoader.loadMany(products);
  }
}
@Injectable()
export class ProductsDataLoaderSELECT
  implements IDataLoader<string, ProductsDTO> {
  constructor(private readonly dataLoader: DataLoader<any, any>) {}

  public static async create(
    productsServ: ProductService,
  ): Promise<ProductsDataLoader> {
    const dataloader = new DataLoader<string, ProductsDTO>(async (ids) => {
      let revs = await productsServ.fetchProductsByIds(ids as string[], [
        'title',
        'id',
        'images',
        'blured_images',
      ]);

      return ids.map((key) => {
        let dt = revs.find((entities) => {
          let ids = entities.map((x) => {
            return x.id;
          });

          return JSON.stringify(ids) == JSON.stringify(key);
        });

        return dt;
      });
    });
    return new ProductsDataLoader(dataloader);
  }
  public async load(id: string) {
    return await this.dataLoader.load(id);
  }
  public async loadMany(products: any[]) {
    return this.dataLoader.loadMany(products);
  }
}
