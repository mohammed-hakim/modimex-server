import { Repository } from 'typeorm';
import { OrderEntity as Order } from './order.entity';
export declare class OrderService {
    private readonly orders;
    private client;
    constructor(orders: Repository<Order>);
    get({ userId, cursor, limit, skip, status: statuss }: {
        userId: any;
        cursor: any;
        limit?: number;
        skip?: any;
        status: any;
    }): Promise<{
        orders: any;
        more: boolean;
    }>;
    getAll({ cursor, limit, skip, status: statuss }: {
        cursor: any;
        limit?: number;
        skip?: any;
        status: any;
    }): Promise<{
        orders: any;
        more: boolean;
    }>;
    update(id: string, data: any): Promise<{
        order: any;
    }>;
    markOrderStatus({ id, status, failedReason }: {
        id: any;
        status: any;
        failedReason: any;
    }): Promise<{
        order: Order;
        success: any;
    }>;
    findByIdAndUserId(id: any, user_id: any): Promise<Order>;
    finWithProductId(id: any): Promise<false | {
        errors: {
            title: string;
            sentence: string;
        }[];
    }>;
    create({ products, user_id, shipping, code }: {
        products: any;
        user_id: any;
        shipping: any;
        code: any;
    }): Promise<{
        order: Order;
        errors: any[];
        success: any;
    }>;
    destroy({ id, user_id }: {
        id: any;
        user_id: any;
    }): Promise<{
        order: Order;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        order?: undefined;
        success?: undefined;
    }>;
    destroyEver({ id, user_id }: {
        id: any;
        user_id: any;
    }): Promise<{
        order: Order;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        order?: undefined;
        success?: undefined;
    }>;
    transf(data: any): any;
    transfS(data: any): any;
}
