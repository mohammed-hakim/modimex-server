import { Catch, ArgumentsHost, HttpException  , ExceptionFilter } from '@nestjs/common';
@Catch(HttpException)
export class GraphQLErrorFilter implements ExceptionFilter  {
  catch(exception: HttpException, host: ArgumentsHost) {
    return { errors: exception.getResponse() };
  }
}
