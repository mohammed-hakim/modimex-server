import { ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
export declare class GraphQLErrorFilter implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): {
        errors: string | object;
    };
}
