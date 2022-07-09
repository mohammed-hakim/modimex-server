import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferEntity } from './offer.entity';
import { OfferController } from './offer.controller';
import { GraphQLErrorFilter } from './../filters/graphql-exception.filter';
import { APP_FILTER } from '@nestjs/core';
@Module({
  providers: [
    OfferService,
    {
      provide: APP_FILTER,
      useClass: GraphQLErrorFilter,
    },
  ],
  imports: [TypeOrmModule.forFeature([OfferEntity])],

  controllers: [OfferController],
})
export class OffersModule {}
