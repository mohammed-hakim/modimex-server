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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = exports.CreateProduct = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let CreateProduct = class CreateProduct {
};
__decorate([
    class_validator_1.Min(1),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateProduct.prototype, "price", void 0);
__decorate([
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(32),
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateProduct.prototype, "title", void 0);
__decorate([
    class_validator_1.MinLength(32),
    class_validator_1.MaxLength(255),
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateProduct.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateProduct.prototype, "mark", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateProduct.prototype, "category", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateProduct.prototype, "quantity", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateProduct.prototype, "features", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateProduct.prototype, "colors", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateProduct.prototype, "sizes", void 0);
CreateProduct = __decorate([
    graphql_1.InputType()
], CreateProduct);
exports.CreateProduct = CreateProduct;
let UpdateProduct = class UpdateProduct {
};
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProduct.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProduct.prototype, "oldprice", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateProduct.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateProduct.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateProduct.prototype, "mark", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateProduct.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProduct.prototype, "quantity", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], UpdateProduct.prototype, "features", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], UpdateProduct.prototype, "colors", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], UpdateProduct.prototype, "sizes", void 0);
UpdateProduct = __decorate([
    graphql_1.InputType()
], UpdateProduct);
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=create-product.validation.js.map