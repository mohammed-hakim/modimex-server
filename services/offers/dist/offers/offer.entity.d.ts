import { BaseEntity } from 'typeorm';
export declare const roleTransformer: {
    to: (value: string[]) => string;
    from: (value: string) => string[];
};
export declare class OfferEntity extends BaseEntity {
    id: string;
    user_id: string;
    products_ids: string[];
    title: string;
    price: number;
    original_price: number;
    quantity: number;
    sells: number;
    category: string;
    mark: string;
    features: string[];
    description: string;
    hide: boolean;
    images: string[];
    blured_images: string[];
    document: string;
    document_with_idx: string;
    document_with_weights: string;
    created_at: number;
    updated_at: number;
    reviewsavg: {
        '1': number;
        '2': number;
        '3': number;
        '4': number;
        '5': number;
    };
    reviews: string;
}
