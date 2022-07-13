import { ProductsDataLoaderSELECT } from './../loaders/products.loader';
import { OrderOfferDataLoader } from './../loaders/order-offer.loader';
import { P_Options } from './../dtoc/types';
import { ProductDTO, OrderDTO, UserDTO } from '@commerce/shared';
import { CreateOrder } from './create-order.validation';
import { OrderProductDataLoader } from '../loaders/order-product.loader';
import { OrderService } from './order.service';
import { UserDataLoader } from '../loaders/user.loader';
declare class order_opts {
    products: CreateOrder[];
    shipping: String;
    code: String;
}
export declare class OrderResolver {
    private readonly orderService;
    private readonly usersDataLoader;
    private readonly orderProductLoader;
    private readonly orderOfferDataLoader;
    private readonly productsDataLoader;
    private client;
    constructor(orderService: OrderService, usersDataLoader: UserDataLoader, orderProductLoader: OrderProductDataLoader, orderOfferDataLoader: OrderOfferDataLoader, productsDataLoader: ProductsDataLoaderSELECT);
    user(order: OrderDTO): Promise<UserDTO>;
    products(order: any): Promise<ProductDTO>;
    prod(order: any): Promise<ProductDTO>;
    offers(order: any): Promise<ProductDTO>;
    mineOrders(options: P_Options, { session: { userId } }: {
        session: {
            userId: any;
        };
    }): Promise<unknown>;
    userOrders(options: P_Options): Promise<unknown>;
    allOrders(options: P_Options): Promise<unknown>;
    deleteOrder(id: String, { session: { userId } }: {
        session: {
            userId: any;
        };
    }): Promise<any>;
    upStatus(id: String, status: String, failedReason: String, prices: number[], total: string, totalNoPromo: string, code: string, { session: { userId } }: {
        session: {
            userId: any;
        };
    }): Promise<unknown>;
    createOrder({ products, shipping, code }: order_opts, { session: { userId } }: {
        session: {
            userId: any;
        };
    }): Promise<unknown>;
}
export {};
