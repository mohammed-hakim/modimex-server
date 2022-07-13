import { ValidationException } from './validation.exception';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): {
        errors: {
            msg: string;
        }[];
    };
}
