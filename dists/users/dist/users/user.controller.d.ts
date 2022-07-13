import { LoginUser, RegisterUser } from '@commerce/shared';
import { ObjectID } from 'typeorm';
import { UserService } from './user.service';
export declare class UserController {
    private readonly users;
    constructor(users: UserService);
    index(data: any): Promise<{
        users: import("./user.entity").UserEntity[];
        more: boolean;
    }>;
    findById(data: any): Promise<{
        user: import("./user.entity").UserEntity;
    }>;
    search(data: any): Promise<{
        users: any;
        more: boolean;
    }>;
    login(data: LoginUser): Promise<{
        user: import("./user.entity").UserEntity;
        success: any;
    }>;
    update(data: any): Promise<{
        user: any;
        success: any;
    }>;
    findWithEmail(data: LoginUser): Promise<false | import("./user.entity").UserEntity>;
    register(data: RegisterUser): Promise<{
        user: import("./user.entity").UserEntity;
        success: any;
    }>;
    me(id: ObjectID): Promise<{
        user: import("./user.entity").UserEntity;
    }>;
    fetchUserById(id: string): Promise<{
        user: import("./user.entity").UserEntity;
    }>;
    fetchUsersByIds(ids: Array<String>): Promise<any[]>;
    transactionCompleted(data: any): Promise<{
        success: {
            title: string;
            sentence: string;
        };
    }>;
    addPromo(data: any): Promise<void>;
}
