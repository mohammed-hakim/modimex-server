import { config } from '@commerce/shared';
import { MyContext } from './../users/types';
import { verify } from 'jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class SellerGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    try {
      const ctx: MyContext = GqlExecutionContext.create(context).getContext();
      let token = ctx.req.session.token;
      let user;

      user = await verify(token, config.JWT_TOKEN);


      if (user && user.seller) {
        return true;
      }
    } catch (error) {
      throw new HttpException(
        [
          {
            title: 'UNAUTHORIZEDSEL',
            sentence: 'you cant access access this page ,please go login first',
          },
        ],
        403,
      );
    }

    //  throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
