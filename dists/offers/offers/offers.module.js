"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const offer_service_1 = require("./offer.service");
const offer_entity_1 = require("./offer.entity");
const offer_controller_1 = require("./offer.controller");
const graphql_exception_filter_1 = require("./../filters/graphql-exception.filter");
const core_1 = require("@nestjs/core");
let OffersModule = class OffersModule {
};
OffersModule = __decorate([
    common_1.Module({
        providers: [
            offer_service_1.OfferService,
            {
                provide: core_1.APP_FILTER,
                useClass: graphql_exception_filter_1.GraphQLErrorFilter,
            },
        ],
        imports: [typeorm_1.TypeOrmModule.forFeature([offer_entity_1.OfferEntity])],
        controllers: [offer_controller_1.OfferController],
    })
], OffersModule);
exports.OffersModule = OffersModule;
//# sourceMappingURL=offers.module.js.map