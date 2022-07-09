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
var UserDataLoader_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataLoader = void 0;
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let UserDataLoader = UserDataLoader_1 = class UserDataLoader {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
    }
    static async create(userService) {
        const dataloader = new DataLoader(async (ids) => {
            let users = await userService.fetchUsersByIds(ids);
            return ids.map((key) => users.find((entity) => entity.id === key));
        });
        return new UserDataLoader_1(dataloader);
    }
    async load(id) {
        return await this.dataLoader.load(id);
    }
};
UserDataLoader = UserDataLoader_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [DataLoader])
], UserDataLoader);
exports.UserDataLoader = UserDataLoader;
//# sourceMappingURL=user.loader.js.map