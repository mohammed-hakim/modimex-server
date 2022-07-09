import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLErrorFilter } from './filters/graphql-exception.filter';
import { config } from '@commerce/shared';
@Module({
  imports: [TypeOrmModule.forRoot(config.DBConfig[0]), EventsModule],
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
