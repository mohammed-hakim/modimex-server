import { ArgumentsHost, HttpException, ExceptionFilter } from '@nestjs/common';
export declare class GraphQLErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): {
        errors: string | object;
    };
}
