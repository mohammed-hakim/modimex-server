import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly products: ProductService) {}

  @MessagePattern('products')
  async index(data: any = undefined) /* : Promise<ProductEntity[]> */ {
    //  await this.products.deleteAll();

    return this.products.get(data);
  }
  @MessagePattern('search')
  async search(data: any = undefined) /* : Promise<ProductEntity[]> */ {
    //  await this.products.deleteAll();

    return this.products.search(data);
  }

  @MessagePattern('create-product')
  async store(data: any) /* : Promise<ProductEntity> */ {
    return await this.products.store(data);
  }

  @MessagePattern('update-product')
  async update(data: any) /* : Promise<ProductEntity>  */ {
    let { id, user_id } = data;

    let dt = await this.products.update(id, data, user_id);

    return dt;
  }

  @MessagePattern('show-product')
  show(data) /* : Promise<ProductEntity> */ {
    return this.products.show(data);
  }

  @MessagePattern('add-products')
  addMany(data) /* : Promise<ProductEntity> */ {
    return this.products.addMany(data);
  }

  @MessagePattern('update_reviews_avg_product')
  uprev(data) /* : Promise<ProductEntity> */ {
    return this.products.updateREV(data);
  }
  @MessagePattern('getByPrice')
  async getByPrice2(data) /* : Promise<ProductEntity> */ {
    return await this.products.getByPrice(data);
  }
  @MessagePattern('fetch-products-by-ids')
  fetchProductsByIds({ ids, select = null }) {
    return this.products.fetchProductsByIds(ids, select);
  }
  @MessagePattern('fetch-products-by-ids-select')
  fetchProductsByIds2(data) {
    return this.products.fetchProductsByIdsSELECT(data);
  }
  @EventPattern('inc_product')
  async handleOrderDeleted(products) {
    this.products.incrementProductsStock(products);
  }
  @EventPattern('dec_product')
  async handleOrderCreated(products) {
    this.products.decrementProductsStock(products);
  }

  @MessagePattern('delete-product')
  destroy({ id, user_id }: { id: string; user_id: string }) {
    return this.products.destroy(id, user_id);
  }

  @MessagePattern('update-product-quantity')
  upQty(data) {
    return this.products.updateQty(data);
  }
}
