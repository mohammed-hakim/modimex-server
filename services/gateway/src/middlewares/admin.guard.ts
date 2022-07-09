import { errors } from '@commerce/shared';
const { UNAUTHORIZED } = errors;
import { config } from '@commerce/shared';
import { MyContext } from './../users/types';
import { verify } from 'jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    try {
      const ctx: MyContext = GqlExecutionContext.create(context).getContext();
      let token = ctx.req.session?.token;
      const user = await verify(token, config.JWT_TOKEN);
      console.log({sess:ctx.req.session , jwt : config , token , a:'adm'});
      if (user && user.is_admin) {
        return true;
      }
      throw new HttpException([UNAUTHORIZED], HttpStatus.UNAUTHORIZED);
    } catch (error) {
      throw new HttpException([UNAUTHORIZED], HttpStatus.UNAUTHORIZED);
    }
  }
}
