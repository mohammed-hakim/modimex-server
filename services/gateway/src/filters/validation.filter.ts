import { ValidationException } from './validation.exception';
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      resp = ctx.getResponse();
    console.log({ ctx, resp });

    return { errors: [{ msg: 'this do not work' }] }; //resp.status(400).json({ hello: 'jj' }); //exception; //{ errors: [exception.getResponse()] };
  }
}
