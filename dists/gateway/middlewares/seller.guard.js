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
exports.SellerGuard = void 0;
const shared_1 = require("@commerce/shared");
const jsonwebtoken_1 = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let SellerGuard = class SellerGuard {
    constructor() { }
    async canActivate(context) {
        try {
            const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
            let token = ctx.req.session.token;
            let user;
            user = await jsonwebtoken_1.verify(token, shared_1.config.JWT_TOKEN);
            if (user && user.seller) {
                return true;
            }
        }
        catch (error) {
            throw new common_1.HttpException([
                {
                    title: 'UNAUTHORIZEDSEL',
                    sentence: 'you cant access access this page ,please go login first',
                },
            ], 403);
        }
    }
};
SellerGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SellerGuard);
exports.SellerGuard = SellerGuard;
//# sourceMappingURL=seller.guard.js.map