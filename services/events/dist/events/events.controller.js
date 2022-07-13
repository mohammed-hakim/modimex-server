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
exports.EventsController = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
let EventsController = class EventsController {
    constructor(events) {
        this.events = events;
    }
    async index(data = undefined) {
        return await this.events.addevent(data);
    }
    async get(data = undefined) {
        return await this.events.get(data);
    }
    async delete_event(id = undefined) {
        return await this.events.delete_event(id);
    }
};
__decorate([
    microservices_1.MessagePattern('add_event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "index", null);
__decorate([
    microservices_1.MessagePattern('get_events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "get", null);
__decorate([
    microservices_1.MessagePattern('delete_event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "delete_event", null);
EventsController = __decorate([
    common_1.Controller('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map