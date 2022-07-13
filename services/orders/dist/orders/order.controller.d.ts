import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orders;
    constructor(orders: OrderService);
    index(data: any): Promise<{
        orders: any;
        more: boolean;
    }>;
    allOrders(data: any): Promise<{
        orders: any;
        more: boolean;
    }>;
    show({ id, user_id }: {
        id: string;
        user_id: string;
    }): Promise<import("./order.entity").OrderEntity>;
    destroy({ id, user_id }: {
        user_id: string;
        id: string;
    }): Promise<{
        order: import("./order.entity").OrderEntity;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        order?: undefined;
        success?: undefined;
    }>;
    findWithProdId(id: any): Promise<false | {
        errors: {
            title: string;
            sentence: string;
        }[];
    }>;
    store(data: any): Promise<{
        order: import("./order.entity").OrderEntity;
        errors: any[];
        success: any;
    }>;
    markOrderStatus(data: any): Promise<{
        order: import("./order.entity").OrderEntity;
        success: any;
    }>;
}
