import { UserDTO } from '@commerce/shared';
import DataLoader = require('dataloader');
import { IDataLoader } from '../contracts/nest-dataloader';
import { UserService } from '../users/user.service';
export declare class UserDataLoader implements IDataLoader<string, UserDTO> {
    private readonly dataLoader;
    constructor(dataLoader: DataLoader<any, any>);
    static create(userService: UserService): Promise<UserDataLoader>;
    load(id: string): Promise<any>;
}
