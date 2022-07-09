"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.redisUsersKey = exports.redisStatisticsKey = exports.redisReviewsKey = exports.redisStatsKey = exports.redisOrdersKey = exports.redisOffersKey = exports.redisProductsKey = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redisProductsKey = 'index-products';
exports.redisOffersKey = 'index-offers';
exports.redisOrdersKey = 'index-orders';
exports.redisStatsKey = 'index-stats';
exports.redisReviewsKey = 'index-reviews';
exports.redisStatisticsKey = 'index-statistics';
exports.redisUsersKey = 'index-users';
const shared_1 = require("@commerce/shared");
const { REDIS_GATEWAY, REDIS_LOCAL, } = shared_1.DB_SERVERS;
let { host, password, port } = REDIS_GATEWAY;
console.log({ REDIS_GATEWAY });
exports.redis = new ioredis_1.default(host, port, { password });
//# sourceMappingURL=redis.js.map