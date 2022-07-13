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
exports.EventsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const events_entity_1 = require("./events.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
let EventsService = class EventsService {
    constructor(event) {
        this.event = event;
    }
    async addevent(data) {
        let ids = [
            'f5444434-5c2d-45ff-9dd2-6cd80a9a6de6',
            'dc9df4e3-89cd-43c5-9b86-0baa77a858c7',
            'd7c77de3-3fd9-4823-afc0-dabd58917ddc',
        ];
        let event = await this.event.save(data);
        return {
            event,
            success: {
                sentence: 'Event created successfully',
                title: 'Event',
            },
        };
    }
    async get(data = {}) {
        let events = await this.event.find(data);
        return { events };
    }
    async deleteAll(data = {}) {
        let events = await this.event.delete({});
        return { events };
    }
    async delete_event(id) {
        await this.event.delete({ id });
        return {
            success: {
                sentence: 'Event deleted successfully',
                title: 'DELET',
            },
        };
    }
};
EventsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(events_entity_1.EventEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map