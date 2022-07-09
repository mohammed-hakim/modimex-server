import { BaseEntity } from 'typeorm';
export declare class StatisticsEntity extends BaseEntity {
    id: string;
    month: number;
    day: number;
    year: number;
    sells_quantity: number;
    sells_price: number;
    sells_data: {
        products: {
            id: string;
            price: number;
            quantity: number;
            isOffer: boolean;
        }[];
    };
}
