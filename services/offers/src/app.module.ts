import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersModule } from './offers/offers.module';
import { APP_FILTER } from '@nestjs/core';
// import { GraphQLErrorFilter } from '@commerce/shared';
import { GraphQLErrorFilter } from './filters/graphql-exception.filter';
import { config, DB_SERVERS } from '@commerce/shared';
// let TpeORMConf = {
//   type: 'postgres',
//   database: 'jjbqceml',
//   username: 'jjbqceml',
//   password: 'kylIABhqxG7gtpeIqbeTzhSKnXvsFSma',
//   logging: true,
//   synchronize: true,
//   migrations: ['dist/migrations/*{.ts,.js}'],
//   migrationsTableName: 'migrations_typeorm',
//   migrationsRun: true,
//   entities: ['dist/**/*.entity.js'],
//   name: 'default',
//   url:
//     'postgres://jjbqceml:kylIABhqxG7gtpeIqbeTzhSKnXvsFSma@dumbo.db.elephantsql.com/jjbqceml',
// } as any;
@Module({
  imports: [TypeOrmModule.forRoot(DB_SERVERS.offersDB), OffersModule],
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
