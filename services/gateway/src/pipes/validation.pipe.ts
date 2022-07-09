import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ServerResponse } from 'http';
import { Http2ServerRequest } from 'http2';
// import { Res } from '@nestjs/common';
@Injectable()
export class ValidationPipeEr implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // let res = value?.res as ServerResponse;
    // let req = value?.req as Http2ServerRequest;
    // console.log({ req: req?.headers , res:res });

    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        { msg: 'No body submmited', status: 400 },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        this.formatErrors(errors),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return value;
  }
  private formatErrors(errors: any[]) {
    return errors.map((err) => {
      for (let property in err.constraints) {
        let field = (err.constraints[property] as string).split(' ')[0];

        let x = { field };
        x['msg'] = err.constraints[property];
        return x;
      }
    });
  }
  private isEmpty(value: any) {
    return !(Object.keys(value).length > 0);
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
