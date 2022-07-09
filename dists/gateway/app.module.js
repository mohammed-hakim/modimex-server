"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const product_service_1 = require("./products/product.service");
const orders_module_1 = require("./orders/orders.module");
const graphql_exception_filter_1 = require("./filters/graphql-exception.filter");
const logging_interceptor_1 = require("./interceptors/logging.interceptor");
const products_module_1 = require("./products/products.module");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const core_1 = require("@nestjs/core");
const stats_module_1 = require("./stats/stats.module");
const reviews_module_1 = require("./reviews/reviews.module");
const events_module_1 = require("./events/events.module");
const offers_module_1 = require("./offers/offers.module");
const statistics_module_1 = require("./statistics/statistics.module");
const redis_1 = require("./utils/redis");
const lang_interceptor_1 = require("./interceptors/lang.interceptor");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                cors: {
                    credentials: true,
                    origin: true,
                },
                context: ({ req, res }) => ({
                    req,
                    res,
                    redis: redis_1.redis,
                }),
                uploads: false,
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            stats_module_1.StatsModule,
            reviews_module_1.ReviewsModule,
            events_module_1.EventsModule,
            offers_module_1.OffersModule,
            statistics_module_1.StatisticsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            product_service_1.ProductService,
            {
                provide: core_1.APP_FILTER,
                useClass: graphql_exception_filter_1.GraphQLErrorFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: lang_interceptor_1.LangInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map