import { BaseEntity } from 'typeorm';
export declare class UserEntity extends BaseEntity {
    gateway_customer_id: string;
    id: string;
    seller: boolean;
    is_admin: boolean;
    name: string;
    email: string;
    phone: string;
    password: string;
    adress: string;
    purshases: {
        id: string;
        offerId: string;
        quantity: number;
        date: number;
    }[];
    money: number;
    promos: {
        code: string;
        price: number;
        reduction: number;
        used: boolean;
    }[];
    moneyreal: number;
    bought_items: number;
    created_at: Date;
    updated_at: Date;
    document: string;
    document_with_idx: string;
    document_with_weights: string;
    hashPassword(): Promise<void>;
    private get token();
    toResponseObject(showToken?: boolean): any;
}
