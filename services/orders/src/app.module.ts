import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config, DB_SERVERS } from '@commerce/shared';
// let TpeORMConf = {
//   type: 'postgres',
//   database: 'bxehlutv',
//   username: 'bxehlutv',
//   password: '1osrr1gAgPLHtCvAFMbzY_NSUYHsN0zV',
//   logging: true,
//   synchronize: true,
//   migrations: ['dist/migrations/*{.ts,.js}'],
//   migrationsTableName: 'migrations_typeorm',
//   migrationsRun: true,
//   entities: ['dist/**/*.entity.js'],
//   name: 'default',
//   url:
//     'postgres://bxehlutv:1osrr1gAgPLHtCvAFMbzY_NSUYHsN0zV@dumbo.db.elephantsql.com/bxehlutv',
// } as any;

@Module({
  imports: [TypeOrmModule.forRoot(DB_SERVERS.ordersDB), OrdersModule],
})
export class AppModule {}
