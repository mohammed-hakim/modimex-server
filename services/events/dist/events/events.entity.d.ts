import { BaseEntity } from 'typeorm';
export declare class EventEntity extends BaseEntity {
    id: string;
    creator: string;
    title: string;
    description: string;
    link: string;
    images: string[];
    blured_images: string[];
    created_at: number;
    updated_at: number;
}
