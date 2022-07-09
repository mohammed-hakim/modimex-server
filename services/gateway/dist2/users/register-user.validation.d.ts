import { LoginUser } from './login-user.validation';
export declare class RegisterUser extends LoginUser {
    name: string;
    password_confirmation: string;
    seller: boolean;
}
