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
exports.UserService = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
const redis_1 = require("../utils/redis");
let UserService = class UserService {
    async get(data) {
        const response = await this.client.send('users', data);
        return response.toPromise();
    }
    async storeRedis(keyData, msg) {
        return new Promise((resolve, reject) => {
            let key = JSON.stringify(keyData) + msg;
            redis_1.redis.get(redis_1.redisUsersKey, (err, products) => {
                if (!products) {
                    return this.client
                        .send(msg, keyData)
                        .toPromise()
                        .then((products) => {
                        redis_1.redis.set(key, JSON.stringify(products), 'EX', 60 * 60 * 60 * 24 * 3);
                        return resolve(products);
                    }, (error) => reject(error));
                }
                resolve(JSON.parse(products));
            });
        });
    }
    async login(data) {
        return new Promise((resolve, reject) => {
            this.client
                .send('login-user', data)
                .toPromise()
                .then((response) => resolve(response), (error) => reject(error));
        });
    }
    async register(data) {
        const response = this.client.send('register-user', data);
        return response.toPromise();
    }
    async me(id) {
        return await this.storeRedis(id, 'current-loggedin-user');
    }
    async findWithEmail(email) {
        return await this.storeRedis(email, 'find-user-email');
    }
    async search(data) {
        return await this.storeRedis(data, 'search_users');
    }
    async findById(data) {
        return await this.storeRedis(data, 'findById');
    }
    async customQR(func, data) {
        return await this.storeRedis(data, func);
    }
    async fetchUsersByIds(ids) {
        return await this.storeRedis(ids, 'fetch-users-by-ids');
    }
    async customMT(func, data) {
        return new Promise((resolve, reject) => {
            this.client
                .send(func, data)
                .toPromise()
                .then((response) => {
                {
                    redis_1.redis.del(redis_1.redisUsersKey);
                    resolve(response);
                }
            }, (error) => {
                reject(error);
            });
        });
    }
    updateUser(data) {
        return new Promise((resolve, reject) => {
            this.client
                .send('update_user', data)
                .toPromise()
                .then(async (user) => {
                console.log('updated');
                redis_1.redis.del(redis_1.redisUsersKey);
                ;
                return resolve(user);
            }, (error) => reject(error));
        });
    }
};
__decorate([
    microservices_1.Client({
        transport: microservices_1.Transport.REDIS,
        options: {
            host: shared_1.config.REDIS_HOST,
            url: `redis://${shared_1.config.REDIS_HOST}:${shared_1.config.REDIS_PORTE}`,
            port: shared_1.config.REDIS_PORTE,
            password: shared_1.config.REDIS_PASS,
        },
    }),
    __metadata("design:type", microservices_1.ClientProxy)
], UserService.prototype, "client", void 0);
UserService = __decorate([
    common_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map