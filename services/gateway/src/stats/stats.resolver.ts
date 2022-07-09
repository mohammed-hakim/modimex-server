import { statsResponse, DTOSimpleArg, SimpleState } from './../dtoc/types';
let priceIMG = [
  'http://drive.google.com/uc?export=view&id=18idur8CXY92zvnR-esK3t6eLdCN7E2r9',
  'http://drive.google.com/uc?export=view&id=1Iu_xuc1xpeFMbuHxRNCUv1CquAWX4lx1',
];
let reductionIMG = [
  'http://drive.google.com/uc?export=view&id=122W7_CrIRZil0J4dnyF7i4DcXUICpNB6',
  'http://drive.google.com/uc?export=view&id=1krv8eQ-3HAGycIYBK5DWyW6bu9k8sVNH',
];

import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { config } from '@commerce/shared';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../middlewares/auth.guard';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { StatsService } from './stats.service';
import { downOne } from '../utils/useful';

@Resolver(() => statsResponse)
export class StatsResolver {
  @Client({
    transport: Transport.REDIS,
    options: {
      host: config.REDIS_HOST,
      url: `redis://${config.REDIS_HOST}:${config.REDIS_PORTE}`,
      port: config.REDIS_PORTE,
      password: config.REDIS_PASS,
    },
  })
  private client: ClientProxy;

  constructor(private readonly statsService: StatsService) {}

  @Query(() => statsResponse)
  async getStats() {  
    return await this.statsService.get_stats(); //x2;
  }

  @Mutation(() => SimpleState)
  @UseGuards(new AuthGuard())
  async setState(
    @Args('what') what: string,
    @Args('name') name: string,
    @Args('token') token: string,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true })
    IMG: FileUpload,
  ) {
    if (IMG) {
      let x = await downOne(IMG, token, true);

      return this.statsService.set_state(what, { name, images: x });
    }

    let x;
    if (this.isJson(name)) {
      if (JSON.parse(name)?.code && !(JSON.parse(name)?.price == 0)) {
        x = priceIMG;
      } else if (JSON.parse(name)?.code && JSON.parse(name)?.price == 0) {
        x = reductionIMG;
      }
    }
    let ff = await this.statsService.set_state(what, { name, images: x });
    console.log({ff});
    
    return ff;
  }
  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  @Mutation(() => SimpleState)
  @UseGuards(new AuthGuard())
  async setStateNOIMG(@Args('what') what: string, @Args('name') name: string) {
    let ff = this.statsService.set_state(what, { name });

    return ff;
  }
  @Mutation(() => SimpleState)
  @UseGuards(new AuthGuard())
  async reSetState(
    @Args('what') what: string,
    @Args({ name: 'arg', type: () => [DTOSimpleArg], nullable: true })
    arg: [DTOSimpleArg],
  ) {
    if (!arg[0].name && !arg[0].images) {
      arg = [] as any;
    }

    return this.statsService.reset_state(what, arg);
  }
}
