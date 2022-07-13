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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("typeorm");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(users) {
        this.users = users;
    }
    index(data) {
        return this.users.get(data);
    }
    findById(data) {
        return this.users.findById(data);
    }
    search(data) {
        return this.users.search(data);
    }
    login(data) {
        return this.users.login(data);
    }
    update(data) {
        let { id } = data;
        return this.users.update(id, data);
    }
    findWithEmail(data) {
        return this.users.findWithEmail(data);
    }
    register(data) {
        return this.users.register(data);
    }
    me(id) {
        return this.users.me({ id });
    }
    fetchUserById(id) {
        return this.users.findById(id);
    }
    fetchUsersByIds(ids) {
        return this.users.fetchUsersByIds(ids);
    }
    transactionCompleted(data) {
        return this.users.transactionCompleted(data);
    }
    addPromo(data) {
        return this.users.addPromo(data);
    }
};
__decorate([
    microservices_1.MessagePattern('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "index", null);
__decorate([
    microservices_1.MessagePattern('findById'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findById", null);
__decorate([
    microservices_1.MessagePattern('search_users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "search", null);
__decorate([
    microservices_1.MessagePattern('login-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.LoginUser !== "undefined" && shared_1.LoginUser) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    microservices_1.MessagePattern('update_user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    microservices_1.MessagePattern('find-user-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof shared_1.LoginUser !== "undefined" && shared_1.LoginUser) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findWithEmail", null);
__decorate([
    microservices_1.MessagePattern('register-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof shared_1.RegisterUser !== "undefined" && shared_1.RegisterUser) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    microservices_1.MessagePattern('current-loggedin-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "me", null);
__decorate([
    microservices_1.MessagePattern('fetch-user-by-id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "fetchUserById", null);
__decorate([
    microservices_1.MessagePattern('fetch-users-by-ids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "fetchUsersByIds", null);
__decorate([
    microservices_1.MessagePattern('order_completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "transactionCompleted", null);
__decorate([
    microservices_1.MessagePattern('add_promo_user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addPromo", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map