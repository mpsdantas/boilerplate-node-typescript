"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
class RequestValidationError extends AppError_1.default {
    constructor(erros, code, codeSystem) {
        super("O processamento de algumas informações não foi realizado.", 400);
        this.code = code;
        this.codeSystem = codeSystem == undefined ? code : codeSystem;
        this.erros = erros;
    }
}
exports.default = RequestValidationError;
;
