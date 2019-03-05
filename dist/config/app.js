"use strict";

const moduleAlias = require("module-alias");

moduleAlias.addAliases({
    controllers: __dirname + "/../" + "src/controllers",
    middlewares: __dirname + "/../" +"src/middlewares",
    models: __dirname + "/../" +"src/models",
    routes: __dirname + "/../" +"src/routes",
    app: __dirname + "/../" +"src",
    utils: __dirname + "/../" +"src/utils",
    validators: __dirname + "/../" +"src/validators",
    config: __dirname + "/../" +"config",
    modules: __dirname + "/../" +"src/modules"
});

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./alias");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const HandleErros_1 = require("app/architecture/erros/HandleErros");
const WelcomeController_1 = require("modules/welcome/controllers/WelcomeController");
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
    console.log(`
		🛑 O servidor está rodando com Node.js em uma versão menor do que 7.6
		Este projeto utiliza funções recentes do Node.js como async/await para lidar com código de execução assíncrona.
		Por favor atualize a versão do Node.js para >= 7.6!
  	`);
    process.exit();
}
let environment = process.argv[2];
dotenv_1.default.config({
    path: environment !== "prod" ? "./env/dev.env" : "./env/prod.env"
});
const app = routing_controllers_1.createExpressServer({
    defaultErrorHandler: false,
    controllers: [WelcomeController_1.WelcomeController],
    middlewares: [HandleErros_1.HandleErros]
});
app.use(express_1.default.static("../public"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
if (environment !== "prod")
    app.use(morgan_1.default("dev"));
app.use((request, response, next) => {
    if (response.statusMessage === undefined)
        return response.status(404).json({
            status: 404,
            erros: [
                {
                    msg: `Nenhuma rota encontrada para ${request.path}`
                }
            ]
        });
});
mongoose_1.default.connect(`${process.env.DATABASE}`, { useNewUrlParser: true });
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connection.on("error", err => {
    console.error(`🙅 🚫 → ${err.message}`);
});
const Welcome_1 = __importDefault(require("app/modules/welcome/models/Welcome"));
// Registrando modulos.
Welcome_1.default.model;
exports.default = app;
