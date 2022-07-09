import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, IsNotEmpty } from 'class-validator';
@InputType()
export class UUID {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  id: string;
}
