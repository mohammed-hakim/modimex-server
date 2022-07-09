import {
  P_Options,
  User,
  userDTOC,
  UserResponse,
  UsersResponse,
} from './../dtoc/types';
import { AuthGuard } from './../middlewares/auth.guard';
import { MyContext } from './types';
import {
  Query,
  Resolver,
  Context,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  UserDTO,
  kwalaDcd5vrs,
  GRE5509jbgUU91,
  config,
  errors,
} from '@commerce/shared';

import { LoginUser, ChangePass } from './login-user.validation';
import { RegisterUser } from './register-user.validation';
import { UserService } from './user.service';
import { COOKI_NAME, FORGPAS_PREFIX, URL2 } from '@commerce/shared';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';
import argon2 from 'argon2';

const { INVALID_TOKEN, USER_NO_EXISTS } = errors;

@Resolver(() => userDTOC)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => String)
  async kwalaDcd5vrs(@Root() user: userDTOC) {
    let x = await v4();

    let x2 = user.is_admin ? kwalaDcd5vrs : x;
    return x2;
  }
  @ResolveField(() => String)
  async GRE5509jbgUU91(@Root() user: userDTOC) {
    let x = await v4();
    let x2 = user.seller ? GRE5509jbgUU91 : x;
    return x2;
  }
  // @UseGuards(new AuthGuard())
  @Query(() => UsersResponse)
  async users(
    //  @Args('page', { nullable: true, defaultValue: 1 }) args: Number,
    @Args('options', { nullable: true }) options: P_Options,
  ) {
    let x = (await this.userService.get(options)) as any;
    return x;
  }
  @Query(() => UserResponse)
  async user(@Args('id') id: string) {
    let x = await this.userService.findById(id);

    return x;
  }
  @Mutation(() => UserResponse)
  async login(
    @Args('data') data: LoginUser,
    @Context() ctx: MyContext,
  ): Promise<{ token: string; id: string; name: string }> {
    try {
      let user = await this.userService.login(data);
      ctx.req.session.userId = user?.user?.id;
      ctx.req.session.token = user?.user?.token;
console.log({user , err : user.errors , sess:ctx.req.session});

      return user;
    } catch (err) {
      console.log(err);
    }
  }
  @Query(() => UsersResponse)
  async searchUsers(
    @Args('options') options: P_Options,
    // @Context() ctx: MyContext,
  ) {
    try {
      let x = await this.userService.customQR('search_users', options);
      return x;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => UserResponse)
  async register(
    @Args('data') data: RegisterUser,
    @Context() ctx: MyContext,
  ): Promise<UserDTO> {
    let user: UserDTO = await this.userService.register(data);

    ctx.req.session.userId = user?.user?.id;
    ctx.req.session.token = user?.user?.token;

    return user;
  }

  @Query(() => UserResponse)
  async me(@Context() ctx: MyContext) {
    let id = ctx.req.session.userId;
    let token = ctx.req.session.token;
    console.log({id , token , sess:ctx.req.session});
    
    if (!id) {
      return {};
    }
    let user = await this.userService.me(id);
    console.log({user});
    
    if (user['user']) {
      user['user']['token'] = token;
    }

    // const decodedToken = await verify(t, config.JWT_TOKEN);
    return user;
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => UserResponse)
  async logout(@Context() { req, res }: MyContext) {
    res.clearCookie(COOKI_NAME);

    return new Promise((res) =>
      req.session.destroy((err: any) => {
        if (err) {
          res(false);
          return;
        }
        res(true);
      }),
    );
  }

  @Mutation(() => Boolean)
  async forgetPassword(
    @Args('email') email: string,
    @Context() { redis }: MyContext,
  ) {
    const user: any = await this.userService.findWithEmail(email);
    if (!user) return true;
    let TOKEN = v4();
    let datys_3 = 1000 * 5; //* 60 * 60 * 24 * 30;
    let key = FORGPAS_PREFIX + TOKEN;

    await redis.set(key, user.id, 'ex', datys_3);

    let a = `${URL2}/auth/reset-password/${TOKEN}"`;

    sendEmail(email, a);
    return true;
  }
  @Mutation(() => UserResponse)
  async changePassword(
    // @Args('token') token: string,
    @Args('data') { password: newPassword, token }: ChangePass,
    @Context() { redis, req }: MyContext,
  ): Promise<UserResponse> {
    let key = FORGPAS_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [INVALID_TOKEN],
      };
    }

    const user: any = await this.userService.me(userId as any);
    console.log({ user });

    if (!user?.user) {
      return {
        errors: [USER_NO_EXISTS],
      };
    }

    let pass = await argon2.hash(newPassword);
    req.session.userId = user?.user?.id;

    this.userService.updateUser({ id: user?.user?.id, password: pass });
    await redis.del(key);
    req.session.userId = user?.user?.id;
    req.session.token = user?.user?.token;

    return user;
  }
  @Mutation(() => UserResponse)
  async updateUser(
    // @Args('token') token: string,
    @Args('data') data: User,
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
  ) {
    data['id'] = userId;
    let user = await this.userService.updateUser(data);

    return user;
  }
}
