import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AdminGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
