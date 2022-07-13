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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const types_1 = require("./../dtoc/types");
const auth_guard_1 = require("./../middlewares/auth.guard");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
const login_user_validation_1 = require("./login-user.validation");
const register_user_validation_1 = require("./register-user.validation");
const user_service_1 = require("./user.service");
const shared_2 = require("@commerce/shared");
const sendEmail_1 = require("../utils/sendEmail");
const uuid_1 = require("uuid");
const argon2_1 = __importDefault(require("argon2"));
const { INVALID_TOKEN, USER_NO_EXISTS } = shared_1.errors;
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async kwalaDcd5vrs(user) {
        let x = await uuid_1.v4();
        let x2 = user.is_admin ? shared_1.kwalaDcd5vrs : x;
        return x2;
    }
    async GRE5509jbgUU91(user) {
        let x = await uuid_1.v4();
        let x2 = user.seller ? shared_1.GRE5509jbgUU91 : x;
        return x2;
    }
    async users(options) {
        let x = (await this.userService.get(options));
        return x;
    }
    async user(id) {
        let x = await this.userService.findById(id);
        return x;
    }
    async login(data, ctx) {
        var _a, _b;
        try {
            let user = await this.userService.login(data);
            ctx.req.session.userId = (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.id;
            ctx.req.session.token = (_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.token;
            console.log({ user, err: user.errors });
            return user;
        }
        catch (err) {
            console.log(err);
        }
    }
    async searchUsers(options) {
        try {
            let x = await this.userService.customQR('search_users', options);
            return x;
        }
        catch (err) {
            console.log(err);
        }
    }
    async register(data, ctx) {
        var _a, _b;
        let user = await this.userService.register(data);
        ctx.req.session.userId = (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.id;
        ctx.req.session.token = (_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.token;
        return user;
    }
    async me(ctx) {
        let id = ctx.req.session.userId;
        let token = ctx.req.session.token;
        if (!id) {
            return {};
        }
        let user = await this.userService.me(id);
        if (user['user']) {
            user['user']['token'] = token;
        }
        return user;
    }
    async logout({ req, res }) {
        res.clearCookie(shared_2.COOKI_NAME);
        return new Promise((res) => req.session.destroy((err) => {
            if (err) {
                res(false);
                return;
            }
            res(true);
        }));
    }
    async forgetPassword(email, { redis }) {
        const user = await this.userService.findWithEmail(email);
        if (!user)
            return true;
        let TOKEN = uuid_1.v4();
        let datys_3 = 1000 * 5;
        let key = shared_2.FORGPAS_PREFIX + TOKEN;
        await redis.set(key, user.id, 'ex', datys_3);
        let a = `${shared_2.URL2}/auth/reset-password/${TOKEN}"`;
        sendEmail_1.sendEmail(email, a);
        return true;
    }
    async changePassword({ password: newPassword, token }, { redis, req }) {
        var _a, _b, _c, _d;
        let key = shared_2.FORGPAS_PREFIX + token;
        const userId = await redis.get(key);
        if (!userId) {
            return {
                errors: [INVALID_TOKEN],
            };
        }
        const user = await this.userService.me(userId);
        console.log({ user });
        if (!(user === null || user === void 0 ? void 0 : user.user)) {
            return {
                errors: [USER_NO_EXISTS],
            };
        }
        let pass = await argon2_1.default.hash(newPassword);
        req.session.userId = (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.id;
        this.userService.updateUser({ id: (_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.id, password: pass });
        await redis.del(key);
        req.session.userId = (_c = user === null || user === void 0 ? void 0 : user.user) === null || _c === void 0 ? void 0 : _c.id;
        req.session.token = (_d = user === null || user === void 0 ? void 0 : user.user) === null || _d === void 0 ? void 0 : _d.token;
        return user;
    }
    async updateUser(data, { req: { session: { userId }, }, }) {
        data['id'] = userId;
        let user = await this.userService.updateUser(data);
        return user;
    }
};
__decorate([
    graphql_1.ResolveField(() => String),
    __param(0, graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.userDTOC]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "kwalaDcd5vrs", null);
__decorate([
    graphql_1.ResolveField(() => String),
    __param(0, graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.userDTOC]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "GRE5509jbgUU91", null);
__decorate([
    graphql_1.Query(() => types_1.UsersResponse),
    __param(0, graphql_1.Args('options', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    graphql_1.Query(() => types_1.UserResponse),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, graphql_1.Args('data')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_validation_1.LoginUser, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    graphql_1.Query(() => types_1.UsersResponse),
    __param(0, graphql_1.Args('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "searchUsers", null);
__decorate([
    graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, graphql_1.Args('data')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_validation_1.RegisterUser, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    graphql_1.Query(() => types_1.UserResponse),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('email')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgetPassword", null);
__decorate([
    graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, graphql_1.Args('data')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_validation_1.ChangePass, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, graphql_1.Args('data')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
UserResolver = __decorate([
    graphql_1.Resolver(() => types_1.userDTOC),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map