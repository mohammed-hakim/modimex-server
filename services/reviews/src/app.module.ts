import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './reviews/reviews.module';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLErrorFilter } from './filters/graphql-exception.filter';
import { config, DB_SERVERS } from '@commerce/shared';
// let TpeORMConf = {
//   type: 'postgres',
//   database: 'qvivpgce',
//   username: 'qvivpgce',
//   password: 'bCBqtJPFD2E7Pa-rxcNI1U7vnlbTjp3y',
//   logging: true,
//   synchronize: true,
//   migrations: ['dist/migrations/*{.ts,.js}'],
//   migrationsTableName: 'migrations_typeorm',
//   migrationsRun: true,
//   entities: ['dist/**/*.entity.js'],
//   name: 'default',
//   url:
//     'postgres://qvivpgce:bCBqtJPFD2E7Pa-rxcNI1U7vnlbTjp3y@dumbo.db.elephantsql.com/qvivpgce',
// } as any;
@Module({
  imports: [TypeOrmModule.forRoot(DB_SERVERS.reviewsDB), ReviewsModule],
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
