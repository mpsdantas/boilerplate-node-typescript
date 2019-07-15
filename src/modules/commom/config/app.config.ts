import "reflect-metadata";
import bodyParser from "body-parser";
import env from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { useExpressServer } from "routing-controllers";
import { Modules } from "../../app.module";
import { HandleErros } from "../errors/handle.error";
import { extractModules } from "../utils/extractModules.util";

const [major, minor] = process.versions.node.split(".").map(parseFloat);

if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(`
		🛑 O servidor está rodando com Node.js em uma versão menor do que 7.6
		Este projeto utiliza funções recentes do Node.js como async/await para lidar com código de execução assíncrona.
		Por favor atualize a versão do Node.js para >= 7.6!
  	`);
  process.exit();
}

let environment: string = process.argv[2];

env.config({
  path: environment !== "prod" ? "./env/dev.env" : "./env/prod.env"
});

const { controllers, middlewares, models } = extractModules(Modules);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app, {
  defaultErrorHandler: false,
  controllers: controllers,
  middlewares: [HandleErros, ...middlewares],
  classTransformer: false,
});

app.use((request: any, response: any, next: any) => {
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

mongoose.connect(`${process.env.DATABASE}`, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 → ${err.message}`);
});

export default app;
