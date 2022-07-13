import { BaseEntity } from 'typeorm';
export declare class StatsEntity extends BaseEntity {
    id: string;
    marks: {
        name: string;
        images: string[];
    }[];
    categories: {
        name: string;
        images: string[];
    }[];
    shippings: {
        id: string;
        name: string;
        images: string[];
        price: number;
        time: number;
    }[];
    promos: {
        code: string;
        images: string[];
        price: number;
        reduction: number;
    }[];
    events: {
        images: string[];
        link: number;
        name: string;
    }[];
    max_price: number;
    max_price_offer: number;
    currency: string;
}
