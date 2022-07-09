"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    JWT_TOKEN: process.env.JWT_TOKEN || "ondoqnwdonqdwq",
    JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || "7d",
    GATEWAY_PORT: process.env.GATEWAY_PORT || 8000,
    GATEWAY_HOST: process.env.GATEWAY_HOST || "127.0.0.1",
    APP_ENV: process.env.APP_ENV || "development",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_URL: process.env.REDIS_URL || "127.0.0.1",
    kwalaDcd5vrs: process.env.kwalaDcd5vrs || "205e0531-c551-4726-960a-21fdb2f4cdd9",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "sk_test_J29GVsb1mCVACXR6LIz1wrW7",
    refreshTOKEN: process.env.refreshTOKEN ||
        "1//044V6l6giuSNyCgYIARAAGAQSNwF-L9IrhLl8rCIN_c4utQGa0NoXg83zj3lIz1WZFUEeTIHGjz0rhbmeIipMN_OCE6e6hfqXKig",

    // REDIS_HOST2: process.env.REDIS_HOST ||
    //     "redis-15350.c266.us-east-1-3.ec2.cloud.redislabs.com",
    // REDIS_PORTE2: parseInt(process.env.REDIS_PORTE) || 15350,
    // REDIS_PASS2: process.env.REDIS_PASS || "4OQVp506UGvwLVjuQiya8pYpNqFgILv8",

    // REDIS_HOST: '127.0.0.1',
    // REDIS_PORTE: 6379,
    // REDIS_PASS: ''

    REDIS_HOST: process.env.REDIS_HOST ||
        "redis-15350.c266.us-east-1-3.ec2.cloud.redislabs.com",
    REDIS_PORTE: parseInt(process.env.REDIS_PORTE) || 15350,
    REDIS_PASS: process.env.REDIS_PASS || "4OQVp506UGvwLVjuQiya8pYpNqFgILv8",

};
//# sourceMappingURL=index.js.map