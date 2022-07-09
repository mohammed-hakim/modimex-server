import { BaseEntity } from 'typeorm';
export declare const roleTransformer: {
    to: (value: string[]) => string;
    from: (value: string) => string[];
};
export declare class ProductEntity extends BaseEntity {
    id: string;
    user_id: string;
    title: string;
    price: number;
    oldprice: number;
    quantity: number;
    sells: number;
    hide: boolean;
    category: string;
    mark: string;
    description: string;
    features: string[];
    colors: string[];
    sizes: string[];
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
