"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = exports.SimpleResponse = exports.EventsResponse = exports.EventResponse = exports.EventDTOC = exports.Event = exports.ReviewsResponse = exports.ReviewResponse = exports.ReviewDTOC = exports.Review = exports.Statistic = exports.statisticsResponse = exports.statsResponse = exports.SimpleState = exports.Shipping = exports.SimpleArg = exports.DTOSimpleArg = exports.OrderResponse = exports.OrdersResponse = exports.orderDTOC = exports.ProductOrderC = exports.P_Options = exports.UsersResponse = exports.ProductsResponse = exports.OffersResponse = exports.OfferResponse = exports.Promo = exports.ChildDTOC = exports.Child = exports.OfferDTOC = exports.ProductResponse = exports.UserResponse = exports.ProductDTOC = exports.basicERR = exports.userDTOC = exports.User = exports.Success = exports.AddressDTOC = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
let AddressDTOC = class AddressDTOC {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddressDTOC.prototype, "address_1", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddressDTOC.prototype, "address_2", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddressDTOC.prototype, "city", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddressDTOC.prototype, "state", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddressDTOC.prototype, "country", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], AddressDTOC.prototype, "zip", void 0);
AddressDTOC = __decorate([
    graphql_1.ObjectType()
], AddressDTOC);
exports.AddressDTOC = AddressDTOC;
let Success = class Success {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Success.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Success.prototype, "sentence", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Success.prototype, "redirect", void 0);
Success = __decorate([
    graphql_1.ObjectType()
], Success);
exports.Success = Success;
let User = class User {
};
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "adress", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
User = __decorate([
    graphql_1.InputType()
], User);
exports.User = User;
let userDTOC = class userDTOC {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], userDTOC.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], userDTOC.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], userDTOC.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], userDTOC.prototype, "token", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], userDTOC.prototype, "adress", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], userDTOC.prototype, "phone", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], userDTOC.prototype, "money", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], userDTOC.prototype, "bought_items", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], userDTOC.prototype, "seller", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], userDTOC.prototype, "is_admin", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Date)
], userDTOC.prototype, "created_at", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], userDTOC.prototype, "kwalaDcd5vrs", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], userDTOC.prototype, "GRE5509jbgUU91", void 0);
userDTOC = __decorate([
    graphql_1.ObjectType()
], userDTOC);
exports.userDTOC = userDTOC;
let basicERR = class basicERR {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], basicERR.prototype, "field", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], basicERR.prototype, "msg", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], basicERR.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], basicERR.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], basicERR.prototype, "sentence", void 0);
basicERR = __decorate([
    graphql_1.ObjectType()
], basicERR);
exports.basicERR = basicERR;
let ProductDTOC = class ProductDTOC {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], ProductDTOC.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], ProductDTOC.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ProductDTOC.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], ProductDTOC.prototype, "oldprice", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ProductDTOC.prototype, "quantity", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ProductDTOC.prototype, "sells", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductDTOC.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductDTOC.prototype, "mark", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], ProductDTOC.prototype, "images", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], ProductDTOC.prototype, "blured_images", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductDTOC.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProductDTOC.prototype, "features", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProductDTOC.prototype, "colors", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProductDTOC.prototype, "sizes", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductDTOC.prototype, "created_at", void 0);
__decorate([
    graphql_1.Field(() => userDTOC, { nullable: true }),
    __metadata("design:type", userDTOC)
], ProductDTOC.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => [ReviewDTOC], { nullable: true }),
    __metadata("design:type", Array)
], ProductDTOC.prototype, "reviews", void 0);
__decorate([
    graphql_1.Field(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], ProductDTOC.prototype, "reviewsavg", void 0);
ProductDTOC = __decorate([
    graphql_1.ObjectType()
], ProductDTOC);
exports.ProductDTOC = ProductDTOC;
let UserResponse = class UserResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Success, { nullable: true }),
    __metadata("design:type", Success)
], UserResponse.prototype, "success", void 0);
__decorate([
    graphql_1.Field(() => userDTOC, { nullable: true }),
    __metadata("design:type", userDTOC)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    graphql_1.ObjectType()
], UserResponse);
exports.UserResponse = UserResponse;
let ProductResponse = class ProductResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], ProductResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Success, { nullable: true }),
    __metadata("design:type", Success)
], ProductResponse.prototype, "success", void 0);
__decorate([
    graphql_1.Field(() => ProductDTOC, { nullable: true }),
    __metadata("design:type", ProductDTOC)
], ProductResponse.prototype, "product", void 0);
ProductResponse = __decorate([
    graphql_1.ObjectType()
], ProductResponse);
exports.ProductResponse = ProductResponse;
let OfferDTOC = class OfferDTOC {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], OfferDTOC.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OfferDTOC.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OfferDTOC.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OfferDTOC.prototype, "mark", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], OfferDTOC.prototype, "sells", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], OfferDTOC.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], OfferDTOC.prototype, "features", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], OfferDTOC.prototype, "images", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], OfferDTOC.prototype, "blured_images", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], OfferDTOC.prototype, "products_ids", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], OfferDTOC.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], OfferDTOC.prototype, "quantity", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], OfferDTOC.prototype, "original_price", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], OfferDTOC.prototype, "created_at", void 0);
__decorate([
    graphql_1.Field(() => [ReviewDTOC], { nullable: true }),
    __metadata("design:type", Array)
], OfferDTOC.prototype, "reviews", void 0);
__decorate([
    graphql_1.Field(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], OfferDTOC.prototype, "reviewsavg", void 0);
__decorate([
    graphql_1.Field(() => [ProductDTOC], { nullable: true }),
    __metadata("design:type", Array)
], OfferDTOC.prototype, "products", void 0);
OfferDTOC = __decorate([
    graphql_1.ObjectType()
], OfferDTOC);
exports.OfferDTOC = OfferDTOC;
let Child = class Child {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Child.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Array)
], Child.prototype, "color", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Array)
], Child.prototype, "size", void 0);
Child = __decorate([
    graphql_1.InputType()
], Child);
exports.Child = Child;
let ChildDTOC = class ChildDTOC {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], ChildDTOC.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => ProductDTOC, { nullable: true }),
    __metadata("design:type", ProductDTOC)
], ChildDTOC.prototype, "prod", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Array)
], ChildDTOC.prototype, "color", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Array)
], ChildDTOC.prototype, "size", void 0);
ChildDTOC = __decorate([
    graphql_1.ObjectType()
], ChildDTOC);
exports.ChildDTOC = ChildDTOC;
let Promo = class Promo {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Promo.prototype, "code", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Promo.prototype, "images", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Promo.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Promo.prototype, "reduction", void 0);
Promo = __decorate([
    graphql_1.ObjectType()
], Promo);
exports.Promo = Promo;
let OfferResponse = class OfferResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], OfferResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Success, { nullable: true }),
    __metadata("design:type", Success)
], OfferResponse.prototype, "success", void 0);
__decorate([
    graphql_1.Field(() => OfferDTOC, { nullable: true }),
    __metadata("design:type", OfferDTOC)
], OfferResponse.prototype, "offer", void 0);
OfferResponse = __decorate([
    graphql_1.ObjectType()
], OfferResponse);
exports.OfferResponse = OfferResponse;
let OffersResponse = class OffersResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], OffersResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], OffersResponse.prototype, "more", void 0);
__decorate([
    graphql_1.Field(() => [OfferDTOC], { nullable: true }),
    __metadata("design:type", Array)
], OffersResponse.prototype, "offers", void 0);
OffersResponse = __decorate([
    graphql_1.ObjectType()
], OffersResponse);
exports.OffersResponse = OffersResponse;
let ProductsResponse = class ProductsResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], ProductsResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], ProductsResponse.prototype, "more", void 0);
__decorate([
    graphql_1.Field(() => [ProductDTOC], { nullable: true }),
    __metadata("design:type", Array)
], ProductsResponse.prototype, "products", void 0);
ProductsResponse = __decorate([
    graphql_1.ObjectType()
], ProductsResponse);
exports.ProductsResponse = ProductsResponse;
let UsersResponse = class UsersResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], UsersResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], UsersResponse.prototype, "more", void 0);
__decorate([
    graphql_1.Field(() => [userDTOC], { nullable: true }),
    __metadata("design:type", Array)
], UsersResponse.prototype, "users", void 0);
UsersResponse = __decorate([
    graphql_1.ObjectType()
], UsersResponse);
exports.UsersResponse = UsersResponse;
let P_Options = class P_Options {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], P_Options.prototype, "limit", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], P_Options.prototype, "skip", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], P_Options.prototype, "cursor", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], P_Options.prototype, "sortBy", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], P_Options.prototype, "marks", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], P_Options.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], P_Options.prototype, "categories", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], P_Options.prototype, "max", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], P_Options.prototype, "min", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], P_Options.prototype, "search_words", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], P_Options.prototype, "notID", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], P_Options.prototype, "mine", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true, defaultValue: [] }),
    __metadata("design:type", Array)
], P_Options.prototype, "ids", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], P_Options.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(() => [[String]], { nullable: true }),
    __metadata("design:type", Array)
], P_Options.prototype, "ids2", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], P_Options.prototype, "select", void 0);
P_Options = __decorate([
    graphql_1.InputType()
], P_Options);
exports.P_Options = P_Options;
let ProductOrderC = class ProductOrderC {
};
__decorate([
    graphql_1.Field(() => ProductDTOC, { nullable: true }),
    __metadata("design:type", ProductDTOC)
], ProductOrderC.prototype, "product", void 0);
__decorate([
    graphql_1.Field(() => OfferDTOC, { nullable: true }),
    __metadata("design:type", ProductDTOC)
], ProductOrderC.prototype, "offer", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductOrderC.prototype, "quantity_ordered", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductOrderC.prototype, "color", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductOrderC.prototype, "size", void 0);
__decorate([
    graphql_1.Field(() => [ChildDTOC], { nullable: true }),
    __metadata("design:type", ChildDTOC)
], ProductOrderC.prototype, "children", void 0);
ProductOrderC = __decorate([
    graphql_1.ObjectType()
], ProductOrderC);
exports.ProductOrderC = ProductOrderC;
let orderDTOC = class orderDTOC {
};
__decorate([
    graphql_1.Field(() => userDTOC),
    __metadata("design:type", userDTOC)
], orderDTOC.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float),
    __metadata("design:type", Number)
], orderDTOC.prototype, "total_price", void 0);
__decorate([
    graphql_1.Field(() => [ProductOrderC]),
    __metadata("design:type", Array)
], orderDTOC.prototype, "products", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Date)
], orderDTOC.prototype, "created_at", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], orderDTOC.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], orderDTOC.prototype, "failedReason", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], orderDTOC.prototype, "shipping", void 0);
__decorate([
    graphql_1.Field(() => Promo, { nullable: true }),
    __metadata("design:type", Promo)
], orderDTOC.prototype, "code", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], orderDTOC.prototype, "id", void 0);
orderDTOC = __decorate([
    graphql_1.ObjectType()
], orderDTOC);
exports.orderDTOC = orderDTOC;
let OrdersResponse = class OrdersResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], OrdersResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], OrdersResponse.prototype, "more", void 0);
__decorate([
    graphql_1.Field(() => [orderDTOC], { nullable: true }),
    __metadata("design:type", Array)
], OrdersResponse.prototype, "orders", void 0);
OrdersResponse = __decorate([
    graphql_1.ObjectType()
], OrdersResponse);
exports.OrdersResponse = OrdersResponse;
let OrderResponse = class OrderResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], OrderResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Success, { nullable: true }),
    __metadata("design:type", Success)
], OrderResponse.prototype, "success", void 0);
__decorate([
    graphql_1.Field(() => orderDTOC, { nullable: true }),
    __metadata("design:type", orderDTOC)
], OrderResponse.prototype, "order", void 0);
OrderResponse = __decorate([
    graphql_1.ObjectType()
], OrderResponse);
exports.OrderResponse = OrderResponse;
let DTOSimpleArg = class DTOSimpleArg {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], DTOSimpleArg.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], DTOSimpleArg.prototype, "link", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], DTOSimpleArg.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], DTOSimpleArg.prototype, "time", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], DTOSimpleArg.prototype, "code", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], DTOSimpleArg.prototype, "reduction", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], DTOSimpleArg.prototype, "images", void 0);
DTOSimpleArg = __decorate([
    graphql_1.InputType()
], DTOSimpleArg);
exports.DTOSimpleArg = DTOSimpleArg;
let SimpleArg = class SimpleArg {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], SimpleArg.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], SimpleArg.prototype, "link", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], SimpleArg.prototype, "images", void 0);
SimpleArg = __decorate([
    graphql_1.ObjectType()
], SimpleArg);
exports.SimpleArg = SimpleArg;
let Shipping = class Shipping {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Shipping.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Shipping.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Shipping.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Shipping.prototype, "time", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Shipping.prototype, "images", void 0);
Shipping = __decorate([
    graphql_1.ObjectType()
], Shipping);
exports.Shipping = Shipping;
let SimpleState = class SimpleState {
};
__decorate([
    graphql_1.Field(() => SimpleArg, { nullable: true }),
    __metadata("design:type", SimpleArg)
], SimpleState.prototype, "mark", void 0);
__decorate([
    graphql_1.Field(() => SimpleArg, { nullable: true }),
    __metadata("design:type", SimpleArg)
], SimpleState.prototype, "event", void 0);
__decorate([
    graphql_1.Field(() => SimpleArg, { nullable: true }),
    __metadata("design:type", SimpleArg)
], SimpleState.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => Shipping, { nullable: true }),
    __metadata("design:type", Shipping)
], SimpleState.prototype, "shipping", void 0);
__decorate([
    graphql_1.Field(() => Promo, { nullable: true }),
    __metadata("design:type", Promo)
], SimpleState.prototype, "promo", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], SimpleState.prototype, "currency", void 0);
__decorate([
    graphql_1.Field(() => Success, { nullable: true }),
    __metadata("design:type", Success)
], SimpleState.prototype, "success", void 0);
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], SimpleState.prototype, "errors", void 0);
SimpleState = __decorate([
    graphql_1.ObjectType()
], SimpleState);
exports.SimpleState = SimpleState;
let statsResponse = class statsResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], statsResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => [SimpleArg], { nullable: true }),
    __metadata("design:type", Array)
], statsResponse.prototype, "marks", void 0);
__decorate([
    graphql_1.Field(() => [SimpleArg], { nullable: true }),
    __metadata("design:type", Array)
], statsResponse.prototype, "events", void 0);
__decorate([
    graphql_1.Field(() => [SimpleArg], { nullable: true }),
    __metadata("design:type", Array)
], statsResponse.prototype, "categories", void 0);
__decorate([
    graphql_1.Field(() => [Shipping], { nullable: true }),
    __metadata("design:type", Array)
], statsResponse.prototype, "shippings", void 0);
__decorate([
    graphql_1.Field(() => [Promo], { nullable: true }),
    __metadata("design:type", Array)
], statsResponse.prototype, "promos", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], statsResponse.prototype, "max_price", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], statsResponse.prototype, "max_price_offer", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true, defaultValue: 'DZD' }),
    __metadata("design:type", String)
], statsResponse.prototype, "currency", void 0);
statsResponse = __decorate([
    graphql_1.ObjectType()
], statsResponse);
exports.statsResponse = statsResponse;
let statisticsResponse = class statisticsResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], statisticsResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => [Statistic], { nullable: true }),
    __metadata("design:type", Array)
], statisticsResponse.prototype, "statistics", void 0);
statisticsResponse = __decorate([
    graphql_1.ObjectType()
], statisticsResponse);
exports.statisticsResponse = statisticsResponse;
let Statistic = class Statistic {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Statistic.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "month", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "year", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "day", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "sells_quantity", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "sells_price", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Statistic.prototype, "sells_data", void 0);
Statistic = __decorate([
    graphql_1.ObjectType()
], Statistic);
exports.Statistic = Statistic;
let Review = class Review {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Review.prototype, "rate", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Review.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Review.prototype, "productId", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], Review.prototype, "isOffer", void 0);
Review = __decorate([
    graphql_1.InputType()
], Review);
exports.Review = Review;
let ReviewDTOC = class ReviewDTOC {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], ReviewDTOC.prototype, "rate", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ReviewDTOC.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ReviewDTOC.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ReviewDTOC.prototype, "productId", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], ReviewDTOC.prototype, "isOffer", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ReviewDTOC.prototype, "created_at", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", userDTOC)
], ReviewDTOC.prototype, "user", void 0);
ReviewDTOC = __decorate([
    graphql_1.ObjectType()
], ReviewDTOC);
exports.ReviewDTOC = ReviewDTOC;
let ReviewResponse = class ReviewResponse {
};
__decorate([
    graphql_1.Field(() => ReviewDTOC),
    __metadata("design:type", ReviewDTOC)
], ReviewResponse.prototype, "review", void 0);
__decorate([
    graphql_1.Field(() => Success, { nullable: true }),
    __metadata("design:type", Success)
], ReviewResponse.prototype, "success", void 0);
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], ReviewResponse.prototype, "errors", void 0);
ReviewResponse = __decorate([
    graphql_1.ObjectType()
], ReviewResponse);
exports.ReviewResponse = ReviewResponse;
let ReviewsResponse = class ReviewsResponse {
};
__decorate([
    graphql_1.Field(() => [ReviewDTOC], { nullable: true }),
    __metadata("design:type", Array)
], ReviewsResponse.prototype, "reviews", void 0);
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], ReviewsResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], ReviewsResponse.prototype, "more", void 0);
ReviewsResponse = __decorate([
    graphql_1.ObjectType()
], ReviewsResponse);
exports.ReviewsResponse = ReviewsResponse;
let Event = class Event {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "creator", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "link", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "images", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "blured_images", void 0);
Event = __decorate([
    graphql_1.InputType()
], Event);
exports.Event = Event;
let EventDTOC = class EventDTOC {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventDTOC.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventDTOC.prototype, "creator", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], EventDTOC.prototype, "images", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], EventDTOC.prototype, "blured_images", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventDTOC.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventDTOC.prototype, "link", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventDTOC.prototype, "created_at", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventDTOC.prototype, "id", void 0);
EventDTOC = __decorate([
    graphql_1.ObjectType()
], EventDTOC);
exports.EventDTOC = EventDTOC;
let EventResponse = class EventResponse {
};
__decorate([
    graphql_1.Field(() => EventDTOC, { nullable: true }),
    __metadata("design:type", EventDTOC)
], EventResponse.prototype, "event", void 0);
__decorate([
    graphql_1.Field(() => Success, { nullable: true }),
    __metadata("design:type", Success)
], EventResponse.prototype, "success", void 0);
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], EventResponse.prototype, "errors", void 0);
EventResponse = __decorate([
    graphql_1.ObjectType()
], EventResponse);
exports.EventResponse = EventResponse;
let EventsResponse = class EventsResponse {
};
__decorate([
    graphql_1.Field(() => [EventDTOC]),
    __metadata("design:type", Array)
], EventsResponse.prototype, "events", void 0);
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], EventsResponse.prototype, "errors", void 0);
EventsResponse = __decorate([
    graphql_1.ObjectType()
], EventsResponse);
exports.EventsResponse = EventsResponse;
let SimpleResponse = class SimpleResponse {
};
__decorate([
    graphql_1.Field(() => [basicERR], { nullable: true }),
    __metadata("design:type", Array)
], SimpleResponse.prototype, "errors", void 0);
__decorate([
    graphql_1.Field(() => Success, { nullable: true }),
    __metadata("design:type", Success)
], SimpleResponse.prototype, "success", void 0);
SimpleResponse = __decorate([
    graphql_1.ObjectType()
], SimpleResponse);
exports.SimpleResponse = SimpleResponse;
let Offer = class Offer {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "mark", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Offer.prototype, "features", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Offer.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Offer.prototype, "quantity", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Offer.prototype, "original_price", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Offer.prototype, "products_ids", void 0);
Offer = __decorate([
    graphql_1.InputType()
], Offer);
exports.Offer = Offer;
//# sourceMappingURL=types.js.map