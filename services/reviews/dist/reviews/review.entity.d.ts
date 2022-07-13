import { BaseEntity } from 'typeorm';
export declare class ReviewEntity extends BaseEntity {
    id: string;
    userId: string;
    productId: string;
    isOffer: string;
    description: string;
    rate: number;
    created_at: number;
    updated_at: number;
}
