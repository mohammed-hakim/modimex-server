import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { ProductController } from './product.controller';
import { GraphQLErrorFilter } from './../filters/graphql-exception.filter';
import { APP_FILTER } from '@nestjs/core';
@Module({
  providers: [
    ProductService,
    {
      provide: APP_FILTER,
      useClass: GraphQLErrorFilter,
    },
  ],
  imports: [TypeOrmModule.forFeature([ProductEntity])],

  controllers: [ProductController],
})
export class ProductsModule {}
