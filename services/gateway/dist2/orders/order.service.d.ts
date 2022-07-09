import { ProductDTO, OrderDTO } from '@commerce/shared';
export declare class OrderService {
    private client;
    inc_dec_order(order: any, what: string, property: any, prices?: any[]): Promise<any>;
    storeRedis(keyData: any, msg: any): Promise<unknown>;
    indexOrdersByUser(data: any): Promise<unknown>;
    getAllOrders(data: any): Promise<unknown>;
    upStatus({ total, totalNoPromo, code, ...data }: {
        [x: string]: any;
        total: any;
        totalNoPromo: any;
        code: any;
    }, userId: any, prices: any): Promise<unknown>;
    createOrder(all: any, userId: any, shipping: any, code: any): Promise<unknown>;
    destroyUserOrder(order_id: any, user_id: any): Promise<OrderDTO>;
    store(products: any, user_id: any, shipping: any, code: any, fetchedProducts: any): Promise<ProductDTO>;
}
