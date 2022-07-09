import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLErrorFilter } from './filters/graphql-exception.filter';
import { config, DB_SERVERS } from '@commerce/shared';
// let TpeORMConf = {
//   type: 'postgres',
//   database: 'tfvvtcci',
//   username: 'tfvvtcci',
//   password: 'cMcDeRhQhEP5XTVntlLZxX12o0X3j0xy',
//   logging: true,
//   synchronize: true,
//   migrations: ['dist/migrations/*{.ts,.js}'],
//   migrationsTableName: 'migrations_typeorm',
//   migrationsRun: true,
//   entities: ['dist/**/*.entity.js'],
//   name: 'default',
//   url:
//     'postgres://tfvvtcci:cMcDeRhQhEP5XTVntlLZxX12o0X3j0xy@dumbo.db.elephantsql.com/tfvvtcci',
// } as any;
// console.log(DB_SERVERS);

//config.DBConfig[0]
@Module({
  imports: [TypeOrmModule.forRoot(DB_SERVERS.productsDB), ProductsModule],
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
