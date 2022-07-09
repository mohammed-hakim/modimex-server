"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const resetPass_template_1 = require("./resetPass.template");
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendEmail(to, text) {
    var transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
            user: 'godev88pro@gmail.com',
            pass: 'hakimdev88$$2',
        },
    });
    let info = await transporter.sendMail({
        from: '"modimex shop ✨" <godev88pro@gmail.com>',
        to,
        subject: 'reset-password',
        html: resetPass_template_1.resetPassTemplate(text),
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map