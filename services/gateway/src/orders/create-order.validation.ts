import { Child } from './../dtoc/types';
import { IsNotEmpty, Min, IsInt, IsUUID, Validate } from 'class-validator';

import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateOrder {
  @Min(1)
  @IsNotEmpty()
  @IsInt()
  @Field()
  quantity: number;
  @IsUUID()
  @Field(() => String, { nullable: true })
  id: string;
  @IsUUID()
  @Field(() => String, { nullable: true })
  offerId: string;
  @Field(() => String, { nullable: true })
  color: string;
  @Field(() => String, { nullable: true })
  size: string;
  @Field(() => [Child], { nullable: true })
  children: Child[];
}
