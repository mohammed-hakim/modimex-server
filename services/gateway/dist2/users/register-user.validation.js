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
exports.RegisterUser = void 0;
const class_validator_1 = require("class-validator");
const login_user_validation_1 = require("./login-user.validation");
const graphql_1 = require("@nestjs/graphql");
let RegisterUser = class RegisterUser extends login_user_validation_1.LoginUser {
};
__decorate([
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(32),
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(),
    __metadata("design:type", String)
], RegisterUser.prototype, "name", void 0);
__decorate([
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(32),
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(),
    __metadata("design:type", String)
], RegisterUser.prototype, "password_confirmation", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsBoolean(),
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], RegisterUser.prototype, "seller", void 0);
RegisterUser = __decorate([
    graphql_1.InputType()
], RegisterUser);
exports.RegisterUser = RegisterUser;
//# sourceMappingURL=register-user.validation.js.map