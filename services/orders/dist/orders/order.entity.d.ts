import { BaseEntity } from 'typeorm';
export declare class OrderEntity extends BaseEntity {
    id: string;
    user_id: string;
    shipping: string;
    code: {
        price: number;
        reduction: number;
        images: string;
        code: string;
    };
    shipping_id: string;
    total_price: number;
    total_price2: number;
    color: string;
    size: string;
    failedReason: string;
    hide: boolean;
    products: {
        id: string;
        offerId: string;
        children: {
            id: string;
            color: string;
            size: number;
        }[];
        quantity: number;
        color: string;
        size: string;
    };
    vals: {
        products: {
            id: string;
            offerId: string;
            children: {
                id: string;
                color: string;
                size: number;
            }[];
            quantity: number;
            color: string;
            size: string;
        };
    };
    status: string;
    created_at: Date;
    updated_at: Date;
}
