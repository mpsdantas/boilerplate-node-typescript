"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = __importDefault(require("config/variables"));
const opts = {
    logFilePath: variables_1.default.pathLog,
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
};
const log = require("simple-node-logger").createSimpleLogger(opts);
exports.default = log;
