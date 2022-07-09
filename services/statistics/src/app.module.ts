import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticsModule } from './statistics/statistics.module';
import { GraphQLErrorFilter } from './filters/graphql-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { config, DB_SERVERS } from '@commerce/shared';
// config.DBConfig[0]
@Module({
  imports: [StatisticsModule, TypeOrmModule.forRoot(DB_SERVERS.statisticsDB)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GraphQLErrorFilter,
    },
  ],
})
export class AppModule {}
