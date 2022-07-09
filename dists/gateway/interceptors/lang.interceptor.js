"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const types_1 = require("../users/types");
let LangInterceptor = class LangInterceptor {
    intercept(context, next) {
        var _a, _b, _c;
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        let lang = (_c = (_b = (_a = context.getNext()) === null || _a === void 0 ? void 0 : _a.req) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c.lang;
        if (req) {
            return next.handle().pipe(operators_1.tap((data) => {
                var _a;
                {
                    if ((_a = data === null || data === void 0 ? void 0 : data.errors) === null || _a === void 0 ? void 0 : _a.length) {
                        data.errors.forEach((h, i) => {
                            if (h.en) {
                                data.errors[i] = data.errors[i][lang];
                            }
                        });
                    }
                    if (data === null || data === void 0 ? void 0 : data.success) {
                        data.success = data.success[lang];
                    }
                }
            }));
        }
        else if (!req) {
            return next.handle().pipe(operators_1.tap((data) => {
                var _a;
                {
                    console.log('interceptor lang', { data });
                    if ((_a = data === null || data === void 0 ? void 0 : data.errors) === null || _a === void 0 ? void 0 : _a.length) {
                        data.errors.forEach((h, i) => {
                            if (h.en) {
                                data.errors[i] = data.errors[i][lang];
                            }
                        });
                    }
                    if (data === null || data === void 0 ? void 0 : data.success) {
                        data.success = data.success[lang];
                    }
                }
            }));
        }
    }
};
LangInterceptor = __decorate([
    common_1.Injectable()
], LangInterceptor);
exports.LangInterceptor = LangInterceptor;
//# sourceMappingURL=lang.interceptor.js.map