"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsModule = void 0;
const reviews_service_1 = require("./reviews.service");
const common_1 = require("@nestjs/common");
const reviews_resolver_1 = require("./reviews.resolver");
const user_loader_1 = require("../loaders/user.loader");
const user_service_1 = require("../users/user.service");
const users_module_1 = require("../users/users.module");
let ReviewsModule = class ReviewsModule {
};
ReviewsModule = __decorate([
    common_1.Module({
        providers: [
            reviews_service_1.ReviewsService,
            reviews_resolver_1.ReviewResolver,
            {
                inject: [user_service_1.UserService],
                useFactory: user_loader_1.UserDataLoader.create,
                provide: user_loader_1.UserDataLoader,
                scope: common_1.Scope.REQUEST,
            },
        ],
        imports: [users_module_1.UsersModule],
        exports: [reviews_service_1.ReviewsService],
    })
], ReviewsModule);
exports.ReviewsModule = ReviewsModule;
//# sourceMappingURL=reviews.module.js.map