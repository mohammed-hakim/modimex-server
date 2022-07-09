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
exports.AdminGuard = void 0;
const shared_1 = require("@commerce/shared");
const { UNAUTHORIZED } = shared_1.errors;
const shared_2 = require("@commerce/shared");
const jsonwebtoken_1 = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let AdminGuard = class AdminGuard {
    constructor() { }
    async canActivate(context) {
        var _a;
        try {
            const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
            let token = (_a = ctx.req.session) === null || _a === void 0 ? void 0 : _a.token;
            const user = await jsonwebtoken_1.verify(token, shared_2.config.JWT_TOKEN);
            if (user && user.is_admin) {
                return true;
            }
            throw new common_1.HttpException([UNAUTHORIZED], common_1.HttpStatus.UNAUTHORIZED);
        }
        catch (error) {
            throw new common_1.HttpException([UNAUTHORIZED], common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AdminGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map