"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("./AppError"));
const RequestValidationError_1 = __importDefault(require("./RequestValidationError"));
const log_1 = __importDefault(require("utils/log"));
const notFound = (req, res, next) => {
    const err = new RequestValidationError_1.default([
        {
            msg: `Nenhuma rota encontrada para ${req.path}`
        }
    ], 404, 100);
    next(err);
};
const catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};
const catchAllErros = (err, req, res, next) => {
    err == undefined
        ? new Error("Erro de processamento interno. (O erro informado no construtor é undefined)")
        : err.error !== undefined
            ? err.error
            : err;
    const ValidationError = mongoose_1.default.Error.ValidationError;
    log_1.default.error(`| ROTA: ${req.path} | Exception: `, err, " | criado em: ", new Date().toJSON());
    if (err instanceof ValidationError) {
        let errosFinal = [];
        Object.keys(err.errors).forEach(key => {
            errosFinal.push({
                msg: err.errors[key].message,
                path: err.errors[key].path
            });
        });
        return res.status(400).json({
            status: false,
            code: parseInt("100"),
            erros: errosFinal
        });
    }
    else if (err instanceof RequestValidationError_1.default) {
        return res.status(err.code).json({
            status: false,
            code: err.codeSystem,
            erros: err.erros
        });
    }
    else if (err instanceof AppError_1.default) {
        return res.status(err.status).json({
            status: false,
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
                status: false,
                erros: [
                    {
                        msg: `O ${campo} já foi utilizado por outro usuário, tente utilizar outro valor diferente de ${dup_key}`
                    }
                ]
            });
        }
        else {
            return res.status(500).json({
                status: false,
                erros: [{ msg: err.message }]
            });
        }
    }
};
exports.default = { notFound, catchErrors, catchAllErros };
