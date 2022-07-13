"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFilter = void 0;
const validation_exception_1 = require("./validation.exception");
const common_1 = require("@nestjs/common");
let ValidationFilter = class ValidationFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp(), resp = ctx.getResponse();
        return { errors: [{ msg: 'hhh' }] };
    }
};
ValidationFilter = __decorate([
    common_1.Catch(validation_exception_1.ValidationException)
], ValidationFilter);
exports.ValidationFilter = ValidationFilter;
//# sourceMappingURL=validation.filter.js.map