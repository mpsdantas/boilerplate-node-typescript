"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HandleErros_1;
"use strict";
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("./AppError"));
const RequestValidationError_1 = __importDefault(require("./RequestValidationError"));
const log_1 = __importDefault(require("utils/log"));
const routing_controllers_1 = require("routing-controllers");
const moment_1 = __importDefault(require("moment"));
require("moment/locale/pt-br");
let HandleErros = HandleErros_1 = class HandleErros {
    error(error, request, response, next) {
        HandleErros_1.catchAllErros(error, request, response, next);
    }
};
HandleErros.catchAllErros = (err, req, res, next) => {
    const ValidationError = mongoose_1.default.Error.ValidationError;
    log_1.default.error(`| ROTA: ${req.path} | Exception: `, `${err.message === undefined || err.message === null ? err : err.message}`, " | criado em: ", `${moment_1.default().format("LLLL[.]")}`);
    if (err instanceof ValidationError) {
        let errosFinal = [];
        Object.keys(err.errors).forEach(key => {
            errosFinal.push({
                msg: err.errors[key].message,
                path: err.errors[key].path
            });
        });
        return res.status(400).json({
            status: 400,
            erros: errosFinal
        });
    }
    else if (err instanceof RequestValidationError_1.default) {
        return res.status(err.code).json({
            status: 400,
            code: err.codeSystem,
            erros: err.erros
        });
    }
    else if (err instanceof AppError_1.default) {
        return res.status(err.status).json({
            status: 400,
            erros: [{ msg: err.message }]
        });
    }
    else {
        if (err.message.indexOf("duplicate key error") !== -1) {
            let campo = err.message
                .split("index:")[1]
                .split("dup key")[0]
                .split("_")[0];
            let dup_key = err.message.split("{ :")[1].split('"')[1];
            return res.status(500).json({
                status: 500,
                erros: [
                    {
                        msg: `O ${campo} já foi utilizado por outro usuário, tente utilizar outro valor diferente de ${dup_key}`
                    }
                ]
            });
        }
        else {
            return res.status(500).json({
                status: 500,
                erros: [
                    {
                        msg: `Erro não mapeado pelo servidor.`
                    }
                ],
                typeErro: err
            });
        }
    }
};
HandleErros = HandleErros_1 = __decorate([
    routing_controllers_1.Middleware({ type: "after" })
], HandleErros);
exports.HandleErros = HandleErros;
