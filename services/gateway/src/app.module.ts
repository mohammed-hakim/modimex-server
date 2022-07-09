import { ProductService } from './products/product.service';
import { OrdersModule } from './orders/orders.module';
import { GraphQLErrorFilter } from './filters/graphql-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ProductsModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import Redis from 'ioredis';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { StatsModule } from './stats/stats.module';
import { ReviewsModule } from './reviews/reviews.module';
import { EventsModule } from './events/events.module';
import { OffersModule } from './offers/offers.module';
import { StatisticsModule } from './statistics/statistics.module';
console.log('before');

import { redis } from './utils/redis';
console.log('after' , {redis});

import { LangInterceptor } from 'interceptors/lang.interceptor';
// const redis = new Redis();
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      cors: {
        credentials: true,
        origin: true,
      },
      context: ({ req, res }) => ({
        req,
        res,
        redis,
      }),
      uploads: false,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    StatsModule,
    ReviewsModule,
    EventsModule,
    OffersModule,
    StatisticsModule,

    // TypeOrmModule.forRoot(db),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    {
      provide: APP_FILTER,
      useClass: GraphQLErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LangInterceptor,
    },
  ],
})
export class AppModule {}
