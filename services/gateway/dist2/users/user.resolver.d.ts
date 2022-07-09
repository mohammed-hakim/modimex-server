import { P_Options, User, userDTOC, UserResponse } from './../dtoc/types';
import { MyContext } from './types';
import { UserDTO } from '@commerce/shared';
import { LoginUser, ChangePass } from './login-user.validation';
import { RegisterUser } from './register-user.validation';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    kwalaDcd5vrs(user: userDTOC): Promise<any>;
    GRE5509jbgUU91(user: userDTOC): Promise<any>;
    users(options: P_Options): Promise<any>;
    user(id: string): Promise<unknown>;
    login(data: LoginUser, ctx: MyContext): Promise<{
        token: string;
        id: string;
        name: string;
    }>;
    searchUsers(options: P_Options): Promise<unknown>;
    register(data: RegisterUser, ctx: MyContext): Promise<UserDTO>;
    me(ctx: MyContext): Promise<unknown>;
    logout({ req, res }: MyContext): Promise<unknown>;
    forgetPassword(email: string, { redis }: MyContext): Promise<boolean>;
    changePassword({ password: newPassword, token }: ChangePass, { redis, req }: MyContext): Promise<UserResponse>;
    updateUser(data: User, { req: { session: { userId }, }, }: MyContext): Promise<unknown>;
}
