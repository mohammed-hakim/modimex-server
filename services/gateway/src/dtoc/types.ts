import { ObjectType, Field, InputType, Int, Float } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';
@ObjectType()
export class AddressDTOC {
  @Field() address_1: string;
  @Field() address_2: string;
  @Field() city: string;
  @Field() state: string;
  @Field() country: string;
  @Field() zip: number;
}
@ObjectType()
export class Success {
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  sentence?: string;
  @Field(() => String, { nullable: true })
  redirect?: string;
}
@InputType()
export class User {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  adress?: string;
  @Field({ nullable: true })
  phone?: string;
}
@ObjectType()
export class userDTOC {
  @Field()
  id: String;
  @Field()
  name: string;
  @Field()
  email?: string;

  @Field(() => String, { nullable: true })
  token: string;

  @Field({ nullable: true })
  adress?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field(() => Float, { nullable: true })
  money?: number;
  @Field(() => Int, { nullable: true })
  bought_items?: number;
  @Field()
  seller: boolean;
  @Field()
  is_admin: boolean;
  // @Field()
  // address: AddressDTOC;
  @Field(() => String, { nullable: true })
  created_at: Date;
  @Field(() => String, { nullable: true })
  kwalaDcd5vrs: String;
  @Field(() => String, { nullable: true })
  GRE5509jbgUU91: String;
}
// @ObjectType()
// export class RevsAVG {
//   @Field(() => String)
//   1: string;
//   @Field(() => String)
//   2: string;
//   @Field(() => String)
//   3: string;
//   @Field(() => String)
//   4: string;
//   @Field(() => String)
//   5: string;
// }
@ObjectType()
export class basicERR {
  @Field(() => String, { nullable: true })
  field?: string;
  @Field(() => String, { nullable: true })
  msg?: string;
  @Field(() => String, { nullable: true })
  status?: string;
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  sentence?: string;
}
@ObjectType()
export class ProductDTOC {
  @Field() id?: string;
  @Field(() => Float, { nullable: true }) price?: number;
  @Field(() => String) title?: string;
  @Field(() => Float, { nullable: true }) oldprice?: number;
  @Field(() => Int, { nullable: true }) quantity?: number;
  @Field(() => Int, { nullable: true }) sells?: number;

  @Field(() => String, { nullable: true }) category?: string;
  @Field(() => String, { nullable: true }) mark?: string;

  @Field(() => [String]) images?: string[];
  @Field(() => [String]) blured_images?: string[];

  @Field(() => String, { nullable: true }) description?: string;
  @Field(() => [String], { nullable: true }) features?: string[];
  @Field(() => [String], { nullable: true }) colors?: string[];
  @Field(() => [String], { nullable: true }) sizes?: string[];

  @Field(() => String, { nullable: true }) created_at?: string;

  @Field(() => userDTOC, { nullable: true }) user?: userDTOC;
  @Field(() => [ReviewDTOC], { nullable: true }) reviews?: ReviewDTOC[];
  @Field(() => graphqlTypeJson, { nullable: true }) reviewsavg?: object;
}

@ObjectType()
export class UserResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Success, { nullable: true })
  success?: Success;
  @Field(() => userDTOC, { nullable: true })
  user?: userDTOC;
}
@ObjectType()
export class ProductResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Success, { nullable: true })
  success?: Success;
  @Field(() => ProductDTOC, { nullable: true })
  product?: ProductDTOC;
}
@ObjectType()
export class OfferDTOC {
  @Field() id?: string;
  @Field(() => String, { nullable: true }) description?: string;
  @Field(() => String, { nullable: true }) category?: string;
  @Field(() => String, { nullable: true }) mark?: string;
  @Field(() => Int, { nullable: true }) sells?: number;
  @Field() title?: string;
  @Field(() => [String], { nullable: true }) features?: string[];
  @Field(() => [String]) images?: string[];
  @Field(() => [String]) blured_images?: string[];

  @Field(() => [String], { nullable: true }) products_ids?: string[];

  @Field() price?: string;
  @Field(() => Int) quantity?: number;
  @Field(() => Float, { nullable: true }) original_price?: number;

  @Field(() => String, { nullable: true }) created_at?: string;
  @Field(() => [ReviewDTOC], { nullable: true }) reviews?: ReviewDTOC[];
  @Field(() => graphqlTypeJson, { nullable: true }) reviewsavg?: object;
  @Field(() => [ProductDTOC], { nullable: true })
  products?: ProductDTOC[];
}

@InputType()
export class Child {
  @Field() id?: string;
  @Field(() => String, { nullable: true }) color?: string[];
  @Field(() => String, { nullable: true }) size?: string[];

  // @Field(() => String) title?: string;
  // @Field(() => [String]) images?: string[];
  // @Field(() => [String]) blured_images?: string[];
}
@ObjectType()
export class ChildDTOC {
  @Field() id?: string;
  @Field(() => ProductDTOC, { nullable: true })
  prod?: ProductDTOC;
  @Field(() => String, { nullable: true }) color?: string[];
  @Field(() => String, { nullable: true }) size?: string[];

  // @Field(() => String) title?: string;
  // @Field(() => [String]) images?: string[];
  // @Field(() => [String]) blured_images?: string[];
}
@ObjectType()
export class Promo {
  @Field(() => String, { nullable: true })
  code?: string;
  @Field(() => [String], { nullable: true })
  images?: string[];
  @Field(() => Float, { nullable: true })
  price?: number;
  @Field(() => Int, { nullable: true })
  reduction?: number;
}
@ObjectType()
export class OfferResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Success, { nullable: true })
  success?: Success;
  @Field(() => OfferDTOC, { nullable: true })
  offer?: OfferDTOC;
}
@ObjectType()
export class OffersResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Boolean, { nullable: true })
  more?: boolean;
  @Field(() => [OfferDTOC], { nullable: true })
  offers?: OfferDTOC[];
}
@ObjectType()
export class ProductsResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  more?: boolean;
  @Field(() => [ProductDTOC], { nullable: true })
  products?: ProductDTOC[];
}

@ObjectType()
export class UsersResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  more?: boolean;
  @Field(() => [userDTOC], { nullable: true })
  users?: userDTOC[];
}

@InputType()
export class P_Options {
  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  skip?: number;
  @Field(() => String, { nullable: true })
  cursor?: string;
  @Field(() => String, { nullable: true })
  sortBy?: string;
  @Field(() => [String], { nullable: true })
  marks?: string[];
  @Field(() => [String], { nullable: true })
  status?: string[];
  @Field(() => [String], { nullable: true })
  categories?: string[];
  @Field(() => Float, { nullable: true })
  max?: number;
  @Field(() => Float, { nullable: true })
  min?: number;
  @Field(() => String, { nullable: true })
  search_words?: string;
  @Field(() => String, { nullable: true })
  notID?: string;
  @Field(() => Boolean, { nullable: true })
  mine?: boolean;
  @Field(() => [String], { nullable: true, defaultValue: [] })
  ids?: string[];
  @Field(() => String, { nullable: true })
  userId?: string;
  @Field(() => [[String]], { nullable: true })
  ids2?: string[][];

  @Field(() => [String], { nullable: true })
  select?: string[];
}
@ObjectType()
export class ProductOrderC {
  @Field(() => ProductDTOC, { nullable: true })
  product?: ProductDTOC;
  @Field(() => OfferDTOC, { nullable: true })
  offer?: ProductDTOC;
  @Field(() => Int)
  quantity_ordered?: number;
  @Field(() => String, { nullable: true })
  color: string;
  @Field(() => String, { nullable: true })
  size: string;
  @Field(() => [ChildDTOC], { nullable: true })
  children: ChildDTOC;
}
@ObjectType()
export class orderDTOC {
  @Field(() => userDTOC)
  user: userDTOC;
  @Field(() => Float)
  total_price: number;
  @Field(() => [ProductOrderC])
  products: ProductOrderC[];
  @Field(() => String)
  created_at: Date;
  @Field(() => String)
  status: string;
  @Field(() => String, { nullable: true })
  failedReason: string;
  @Field(() => String, { nullable: true })
  shipping: string;
  @Field(() => Promo, { nullable: true })
  code: Promo;
  @Field(() => String)
  id: string;
}
@ObjectType()
export class OrdersResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  more?: boolean;
  @Field(() => [orderDTOC], { nullable: true })
  orders?: orderDTOC[];
}
@ObjectType()
export class OrderResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Success, { nullable: true })
  success?: Success;
  @Field(() => orderDTOC, { nullable: true })
  order?: orderDTOC;
}

@InputType()
export class DTOSimpleArg {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  link?: string;
  //just for shipping in front need it
  @Field(() => Float, { nullable: true })
  price?: number;
  @Field(() => Int, { nullable: true })
  time?: number;
  @Field(() => String, { nullable: true })
  code?: string; // // // // // /// // // // // // // // // // // // // //
  @Field(() => Int, { nullable: true })
  reduction?: number;

  @Field(() => [String], { nullable: true })
  images?: string[];
}
@ObjectType()
export class SimpleArg {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  link?: string; // @Field(() => String, { nullable: true })
  // image?: string;
  @Field(() => [String], { nullable: true })
  images?: string[];
}
@ObjectType()
export class Shipping {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => Float, { nullable: true })
  price?: number;
  @Field(() => Int, { nullable: true })
  time?: number;

  @Field(() => [String], { nullable: true })
  images?: string[];
}

@ObjectType()
export class SimpleState {
  @Field(() => SimpleArg, { nullable: true })
  mark?: SimpleArg;
  @Field(() => SimpleArg, { nullable: true })
  event?: SimpleArg;
  @Field(() => SimpleArg, { nullable: true })
  category?: SimpleArg;
  @Field(() => Shipping, { nullable: true })
  shipping?: Shipping;
  @Field(() => Promo, { nullable: true })
  promo?: Promo;
  @Field(() => String, { nullable: true })
  currency?: string;
  @Field(() => Success, { nullable: true })
  success?: Success;
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
}
@ObjectType()
export class statsResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => [SimpleArg], { nullable: true })
  marks?: SimpleArg[];
  @Field(() => [SimpleArg], { nullable: true })
  events?: SimpleArg[];
  @Field(() => [SimpleArg], { nullable: true })
  categories?: SimpleArg[];
  @Field(() => [Shipping], { nullable: true })
  shippings?: Shipping[];
  @Field(() => [Promo], { nullable: true })
  promos?: Promo[];
  @Field(() => Float, { nullable: true })
  max_price?: number;
  @Field(() => Float, { nullable: true })
  max_price_offer?: number;
  @Field(() => String, { nullable: true, defaultValue: 'DZD' })
  currency?: string;
}
@ObjectType()
export class statisticsResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => [Statistic], { nullable: true })
  statistics?: Statistic[];
}
@ObjectType()
export class Statistic {
  @Field(() => String, { nullable: true })
  id?: String;
  @Field(() => Int, { nullable: true })
  month?: number;
  @Field(() => Int, { nullable: true })
  year?: number;
  @Field(() => Int, { nullable: true })
  day?: number;
  @Field(() => Int, { nullable: true })
  sells_quantity: number;
  @Field(() => Float, { nullable: true })
  sells_price: number;
  @Field(() => String, { nullable: true })
  sells_data: {
    products: { id: string; price: number; time: number }[];
  };
}
@InputType()
export class Review {
  @Field(() => Number)
  rate: number;
  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  productId: string;
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isOffer: boolean;
}
@ObjectType()
export class ReviewDTOC {
  @Field(() => Number)
  rate: number;
  @Field(() => String)
  description: string;
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  productId: string;
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isOffer: boolean;
  @Field(() => String)
  created_at: string;
  @Field() user?: userDTOC;
}

@ObjectType()
export class ReviewResponse {
  @Field(() => ReviewDTOC)
  review: ReviewDTOC;
  @Field(() => Success, { nullable: true })
  success?: Success;
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
}

@ObjectType()
export class ReviewsResponse {
  @Field(() => [ReviewDTOC], { nullable: true })
  reviews?: ReviewDTOC[];
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  more?: boolean;
}

@InputType()
export class Event {
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  creator?: string;
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => [String], { nullable: true })
  images?: string[];
  @Field(() => [String], { nullable: true })
  blured_images?: string[];
}
@ObjectType()
export class EventDTOC {
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  creator?: string;
  @Field(() => [String], { nullable: true })
  images?: string[];
  @Field(() => [String], { nullable: true })
  blured_images?: string[];
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  link?: string;
  @Field(() => String, { nullable: true })
  created_at?: string;
  @Field(() => String, { nullable: true })
  id?: string;
}

@ObjectType()
export class EventResponse {
  @Field(() => EventDTOC, { nullable: true })
  event?: EventDTOC;
  @Field(() => Success, { nullable: true })
  success?: Success;
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
}
@ObjectType()
export class EventsResponse {
  @Field(() => [EventDTOC])
  events?: EventDTOC[];

  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
}

@ObjectType()
export class SimpleResponse {
  @Field(() => [basicERR], { nullable: true })
  errors?: basicERR[];
  @Field(() => Success, { nullable: true })
  success?: Success;
}
@InputType()
export class Offer {
  @Field(() => String, { nullable: true }) title?: string;
  @Field(() => String, { nullable: true }) description?: string;
  @Field(() => String, { nullable: true }) category?: string;
  @Field(() => String, { nullable: true }) mark?: string;
  @Field(() => [String], { nullable: true }) features?: string[];
  @Field(() => Float, { nullable: true }) price?: number;
  @Field(() => Int, { nullable: true }) quantity?: number;
  @Field(() => Float, { nullable: true }) original_price?: number;
  @Field(() => [String], { nullable: true }) products_ids?: string[];
}
