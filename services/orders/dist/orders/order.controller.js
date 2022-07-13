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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const microservices_1 = require("@nestjs/microservices");
let OrderController = class OrderController {
    constructor(orders) {
        this.orders = orders;
    }
    index(data) {
        return this.orders.get(data);
    }
    allOrders(data) {
        console.log(data);
        return this.orders.getAll(data);
    }
    show({ id, user_id }) {
        console.log(id, user_id);
        return this.orders.findByIdAndUserId(id, user_id);
    }
    destroy({ id, user_id }) {
        return this.orders.destroy({ id, user_id });
    }
    findWithProdId(id) {
        return this.orders.finWithProductId(id);
    }
    store(data) {
        return this.orders.create(data);
    }
    markOrderStatus(data) {
        return this.orders.markOrderStatus(data);
    }
};
__decorate([
    microservices_1.MessagePattern('index-orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "index", null);
__decorate([
    microservices_1.MessagePattern('all-orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "allOrders", null);
__decorate([
    microservices_1.MessagePattern('show-user-order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "show", null);
__decorate([
    microservices_1.MessagePattern('destroy-order-by-id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "destroy", null);
__decorate([
    microservices_1.MessagePattern('find-order-by-productId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findWithProdId", null);
__decorate([
    microservices_1.MessagePattern('create_order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "store", null);
__decorate([
    microservices_1.EventPattern('order_charged'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "markOrderStatus", null);
OrderController = __decorate([
    common_1.Controller('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map