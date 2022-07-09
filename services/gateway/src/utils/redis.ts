import Redis from 'ioredis';
export const redisProductsKey = 'index-products';
export const redisOffersKey = 'index-offers';
export const redisOrdersKey = 'index-orders';
export const redisStatsKey = 'index-stats';
export const redisReviewsKey = 'index-reviews';
export const redisStatisticsKey = 'index-statistics';
export const redisUsersKey = 'index-users';
import { config, DB_SERVERS } from '@commerce/shared';
const {
  REDIS_GATEWAY,
  // REDIS_OFFERS_PRODS,
  // REDIS_USERS_ORDERS,
  REDIS_LOCAL,
} = DB_SERVERS;

// let { host1, password1, port1 } = REDIS_LOCAL;
// export const redis = new Redis(host1, port1, { password: password1 });

// let { host2, password2, port2 } = REDIS_USERS_ORDERS;
// export const redis_users_orders = new Redis(host2, port2, {
//   password: password2,
// });
// let { host3, password3, port3 } = REDIS_OFFERS_PRODS;
// export const redis_offers_prods = new Redis(host3, port3, {
//   password: password3,
// });
let { host, password, port } = REDIS_GATEWAY;
console.log({ REDIS_GATEWAY });

export const redis = new Redis(host, port, { password });
