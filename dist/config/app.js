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

const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const projectModules_1 = __importDefault(require("./projectModules"));
const mongoose_1 = __importDefault(require("mongoose"));
const handleErros_1 = __importDefault(require("utils/erros/handleErros"));
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
const app = express_1.default();
app.use(express_1.default.static("../public"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
if (environment !== "prod")
    app.use(morgan_1.default("dev"));
app.use("/", projectModules_1.default.welcome.routes);
app.use(handleErros_1.default.notFound);
app.use(handleErros_1.default.catchAllErros);
mongoose_1.default.connect(`${process.env.DATABASE}`, { useNewUrlParser: true });
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connection.on("error", err => {
    console.error(`🙅 🚫 → ${err.message}`);
});
exports.default = app;
