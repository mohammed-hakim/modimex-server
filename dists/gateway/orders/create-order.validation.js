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
exports.CreateOrder = void 0;
const types_1 = require("./../dtoc/types");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let CreateOrder = class CreateOrder {
};
__decorate([
    class_validator_1.Min(1),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    graphql_1.Field(),
    __metadata("design:type", Number)
], CreateOrder.prototype, "quantity", void 0);
__decorate([
    class_validator_1.IsUUID(),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateOrder.prototype, "id", void 0);
__decorate([
    class_validator_1.IsUUID(),
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateOrder.prototype, "offerId", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateOrder.prototype, "color", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateOrder.prototype, "size", void 0);
__decorate([
    graphql_1.Field(() => [types_1.Child], { nullable: true }),
    __metadata("design:type", Array)
], CreateOrder.prototype, "children", void 0);
CreateOrder = __decorate([
    graphql_1.InputType()
], CreateOrder);
exports.CreateOrder = CreateOrder;
//# sourceMappingURL=create-order.validation.js.map