import { UserDTO, RegisterUser, LoginUser } from '@commerce/shared';
import { ObjectID } from 'typeorm';
export declare class UserService {
    private client;
    get(data: any): Promise<UserDTO[]>;
    storeRedis(keyData: any, msg: any): Promise<unknown>;
    login(data: LoginUser): Promise<UserDTO>;
    register(data: RegisterUser): Promise<UserDTO>;
    me(id: ObjectID): Promise<unknown>;
    findWithEmail(email: any): Promise<unknown>;
    search(data: any): Promise<unknown>;
    findById(data: any): Promise<unknown>;
    customQR(func: any, data: any): Promise<unknown>;
    fetchUsersByIds(ids: string[]): UserDTO;
    customMT(func: any, data: any): Promise<unknown>;
    updateUser(data: any): Promise<unknown>;
}
