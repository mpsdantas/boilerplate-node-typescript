import "module-alias/register";

import express from "express";

import "reflect-metadata";

import { createExpressServer } from "routing-controllers";

import env from "dotenv";

import bodyParser from "body-parser";

import morgan from "morgan";

import mongoose from "mongoose";

import { HandleErros } from "app/architecture/erros/HandleErros";

import { WelcomeController } from "modules/welcome/controllers/WelcomeController";

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

const app = createExpressServer({
	defaultErrorHandler: false,
	controllers: [WelcomeController],
	middlewares: [HandleErros]
});

app.use(express.static("../public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

if (environment !== "prod") app.use(morgan("dev"));

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

import Welcome from 'app/modules/welcome/models/Welcome';

// Registrando modulos.

Welcome.model

export default app;
