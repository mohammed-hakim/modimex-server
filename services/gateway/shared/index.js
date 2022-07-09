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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRE5509jbgUU91 = exports.kwalaDcd5vrs = exports.FORGPAS_PREFIX = exports.FRONT_LINK = exports.URL2 = exports.URL = exports.COOKI_NAME = exports.__prod__ = void 0;
require("dotenv/config");
__exportStar(require("./dto/address.dto"), exports);
__exportStar(require("./dto/user.dto"), exports);
__exportStar(require("./dto/product.dto"), exports);
__exportStar(require("./dto/order.dto"), exports);
var config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
exports.errors = __importStar(require("./errors"));
exports.success = __importStar(require("./success"));
exports.DB_SERVERS = __importStar(require("./db-servers"));
exports.__prod__ = process.env.NODE_ENV === "production";
exports.COOKI_NAME = "qid";
exports.URL = "http://localhost:2600";
exports.URL2 = "https://modimex2.herokuapp.com";
exports.FRONT_LINK = "http://localhost:4200";
exports.FORGPAS_PREFIX = "forgot-password:";
exports.kwalaDcd5vrs = "205e0531-c551-4726-960a-21fdb2f4cdd9";
exports.GRE5509jbgUU91 = "469e0965-c551-1257-111a-99fdb2f4cvg3";
//# sourceMappingURL=index.js.map