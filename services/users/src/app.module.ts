import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLErrorFilter } from './filters/graphql-exception.filter';
import { config, DB_SERVERS } from '@commerce/shared';
// let TpeORMConf = {
//   type: 'postgres',
//   database: 'vicylpxt',
//   username: 'vicylpxt',
//   password: 'NbZGjQyjFJPInysSq9JnYewfp4jj3SNr',
//   logging: true,
//   synchronize: true,
//   migrations: ['dist/migrations/*{.ts,.js}'],
//   migrationsTableName: 'migrations_typeorm',
//   migrationsRun: true,
//   entities: ['dist/**/*.entity.js'],
//   name: 'default',
//   url:
//     'postgres://vicylpxt:NbZGjQyjFJPInysSq9JnYewfp4jj3SNr@dumbo.db.elephantsql.com/vicylpxt',
// } as any;
@Module({
  imports: [TypeOrmModule.forRoot(DB_SERVERS.usersDB), UsersModule],
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
