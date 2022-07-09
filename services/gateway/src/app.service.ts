import { OffersService } from './offers/offers.service';
import { ProductService } from './products/product.service';
// import { config } from '@commerce/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly productService: ProductService,
    private readonly OffersService: OffersService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  addProds(data): any {
    return this.productService.addMany(data);
  }
  addOffers(data): any {
    return this.OffersService.addOffers(data);
  }
}
