import { errors } from '@commerce/shared';

const { UNAUTHORIZED } = errors;
import { MyContext } from './../users/types';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: MyContext = GqlExecutionContext.create(context).getContext();
    const id = ctx.req.session.token;
    let x = id ? true : false;
    console.log({sess:ctx.req.session , a:'auth'});
    
    if (!x) {      
      throw new HttpException([UNAUTHORIZED], 404);
    }
    return x;
  }
}
