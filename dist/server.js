"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
const os_1 = __importDefault(require("os"));
app_1.default.listen(process.env.PORT, () => {
    let environment = process.argv[2];
    console.log(`
	▒█▄░▒█ █▀▀█ █▀▀▄ █▀▀ ░░▀ █▀▀ 
	▒█▒█▒█ █░░█ █░░█ █▀▀ ░░█ ▀▀█ 
	▒█░░▀█ ▀▀▀▀ ▀▀▀░ ▀▀▀ █▄█ ▀▀▀ 
	`);
    console.log(`\n➡➡ The server is online: http://${os_1.default.hostname()}:${process.env.PORT}/, OS: ${os_1.default.type()} ${os_1.default.release()}. Environment: ${environment !== "prod" ? "dev" : "prod"}, with Node.js v${process.versions.node}.`);
});
