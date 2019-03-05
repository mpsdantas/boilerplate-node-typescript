"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAliases({
    controllers: __dirname + "/../" + "src/controllers",
    middlewares: __dirname + "/../" + "src/middlewares",
    models: __dirname + "/../" + "src/models",
    routes: __dirname + "/../" + "src/routes",
    app: __dirname + "/../" + "src",
    utils: __dirname + "/../" + "src/utils",
    validators: __dirname + "/../" + "src/validators",
    config: __dirname + "/../" + "config",
    modules: __dirname + "/../" + "src/modules"
});
exports.default = module_alias_1.default;
