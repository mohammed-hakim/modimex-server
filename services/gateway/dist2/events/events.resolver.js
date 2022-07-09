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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventResolver = void 0;
const useful_1 = require("../utils/useful");
const events_service_1 = require("./events.service");
const types_1 = require("./../dtoc/types");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../middlewares/auth.guard");
const graphql_upload_1 = require("graphql-upload");
let EventResolver = class EventResolver {
    constructor(eventsServ) {
        this.eventsServ = eventsServ;
    }
    async getEvents() {
        return await this.eventsServ.getEvents();
    }
    async addEvent({ req: { session: { userId }, }, }, data, token, IMGS) {
        let paths = await useful_1.downAll(IMGS, token, true);
        data['images'] = IMGS.length
            ? paths[0]
            : ['http://localhost:2600/images/default.jpg'];
        data['blured_images'] = IMGS.length
            ? paths[1]
            : ['http://localhost:2600/images/default.jpg'];
        data['creator'] = userId;
        return this.eventsServ.add_event(data);
    }
    async deleteEvent(id) {
        return this.eventsServ.deleteEvent(id);
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
], EventResolver.prototype, "client", void 0);
__decorate([
    graphql_1.Query(() => types_1.EventsResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getEvents", null);
__decorate([
    graphql_1.Mutation(() => types_1.EventResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('event')),
    __param(2, graphql_1.Args('token', { nullable: true })),
    __param(3, graphql_1.Args({ name: 'images', type: () => [graphql_upload_1.GraphQLUpload], nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.Event,
        String, Array]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "addEvent", null);
__decorate([
    graphql_1.Mutation(() => types_1.SimpleResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deleteEvent", null);
EventResolver = __decorate([
    graphql_1.Resolver(() => types_1.EventDTOC),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventResolver);
exports.EventResolver = EventResolver;
//# sourceMappingURL=events.resolver.js.map