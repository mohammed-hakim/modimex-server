"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const shared_1 = require("@commerce/shared");
const redis_1 = require("./utils/redis");
const graphql_upload_1 = require("graphql-upload");
const bodyParser = __importStar(require("body-parser"));
const validation_pipe_1 = require("./pipes/validation.pipe");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mung = require('express-mung');
const helmet = require('helmet');
const xXssProtection = require('x-xss-protection');
const hpp = require('hpp');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const RedisStore = connect_redis_1.default(express_session_1.default);
    console.log({ URL2: shared_1.URL2 });
    let PORT = process.env.PORT || 8080;
    console.log({ PORT });
    app.enableCors({
        origin: [
            'http://localhost:4200',
            'http://localhost:4555',
            'http://localhost:8080',
            'http://localhost:4233',
            'http://localhost:4888',
            'http://127.0.0.1:8080',
            shared_1.URL2,
            shared_1.URL3,
        ],
        credentials: true,
    });
    app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
    app.use(graphql_upload_1.graphqlUploadExpress({ maxFiles: 10 }));
    app.use(express_session_1.default({
        store: new RedisStore({ client: redis_1.redis, disableTouch: true }),
        secret: 'keyboard cat',
        name: shared_1.COOKI_NAME,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        }
    }));
    console.log({ __prod__: shared_1.__prod__ }, 'what a time btro !!');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.useGlobalPipes(new validation_pipe_1.ValidationPipeEr());
    app.use(mung.json(function transform(body, req, res) {
        console.log({ body });
        return body;
    }));
    await app.listen(PORT);
    console.log('http://localhostttt:' + PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map