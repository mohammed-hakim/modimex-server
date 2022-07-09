import { OffersService } from './offers/offers.service';
import { ProductService } from './products/product.service';
export declare class AppService {
    private readonly productService;
    private readonly OffersService;
    constructor(productService: ProductService, OffersService: OffersService);
    getHello(): string;
    addProds(data: any): any;
    addOffers(data: any): any;
}
