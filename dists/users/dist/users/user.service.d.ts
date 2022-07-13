import { UserEntity } from './user.entity';
import { LoginUser, RegisterUser, UserDTO } from '@commerce/shared';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly Users;
    constructor(Users: Repository<UserEntity>);
    findById(id: string): Promise<{
        user: UserEntity;
    }>;
    findWithEmail(email: string): Promise<false | UserEntity>;
    fetchUsersByIds(ids: Array<String>): Promise<UserDTO[]>;
    me({ id }: any): Promise<{
        user: UserEntity;
    }>;
    get(options: any): Promise<{
        users: UserEntity[];
        more: boolean;
    }>;
    login({ email, password }: LoginUser): Promise<{
        user: UserEntity;
        success: any;
    }>;
    register({ email, password, password_confirmation, seller, name, is_admin, }: RegisterUser): Promise<{
        user: UserEntity;
        success: any;
    }>;
    update(id: string, data: any): Promise<{
        user: any;
        success: any;
    }>;
    addPromo(promo: any): Promise<void>;
    transactionCompleted({ products, userId, total, code, totalNoPromo }: {
        products: any;
        userId: any;
        total: any;
        code: any;
        totalNoPromo: any;
    }): Promise<{
        success: {
            title: string;
            sentence: string;
        };
    }>;
    search(data: any): Promise<{
        users: any;
        more: boolean;
    }>;
    create_idx(): Promise<void>;
}
