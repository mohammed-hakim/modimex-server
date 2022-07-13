"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const shared_1 = require("@commerce/shared");
const { UNAUTHORIZED } = shared_1.errors;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
        const id = ctx.req.session.token;
        let x = id ? true : false;
        if (!x) {
            throw new common_1.HttpException([UNAUTHORIZED], 404);
        }
        return x;
    }
};
AuthGuard = __decorate([
    common_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map