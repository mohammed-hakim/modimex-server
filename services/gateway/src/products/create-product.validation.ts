import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUrl,
  Min,
  Max,
  IsInt,
} from 'class-validator';
import { InputType, Field, Int, Float } from '@nestjs/graphql';
@InputType()
export class CreateProduct {
  @Min(1)
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int, { nullable: true })
  price: number;

  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  title: string;
  @MinLength(32)
  @MaxLength(255)
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  description: string;
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  mark: string;
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  category: string;
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { nullable: true })
  quantity: number; // @IsUrl()

  @IsNotEmpty()
  @Field(() => [String], { nullable: true })
  features: string[];

  @IsNotEmpty()
  @Field(() => [String], { nullable: true })
  colors: string[]; // @IsNotEmpty()

  @IsNotEmpty()
  @Field(() => [String], { nullable: true })
  sizes: string[]; // image: string;
}

@InputType()
export class UpdateProduct {
  @Field(() => Float, { nullable: true })
  price: number;
  @Field(() => Float, { nullable: true })
  oldprice: number;
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  mark: string;

  @Field(() => String, { nullable: true })
  category: string;

  @Field(() => Int, { nullable: true })
  quantity: number; // @IsUrl()

  @Field(() => [String], { nullable: true })
  features: string[];

  @Field(() => [String], { nullable: true })
  colors: string[]; //

  @Field(() => [String], { nullable: true })
  sizes: string[]; // image: string;
}
