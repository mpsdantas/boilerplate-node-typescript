import { Request, Response } from "express";

import mongoose from "mongoose";

import AppError from "./AppError";

import RequestValidationError from "./RequestValidationError";

import log from "utils/log";

import {
	Middleware,
	ExpressErrorMiddlewareInterface
} from "routing-controllers";

import moment from 'moment';

import 'moment/locale/pt-br';

@Middleware({ type: "after" })
export class HandleErros implements ExpressErrorMiddlewareInterface {
	error(error: any, request: any, response: any, next: (err: any) => any) {
		HandleErros.catchAllErros(error, request, response, next);
	}

	static catchAllErros: any = (
		err: any,
		req: Request,
		res: Response,
		next: any
	) => {
		const ValidationError = mongoose.Error.ValidationError;

		log.error(
			`| ROTA: ${req.path} | Exception: `,
			`${err.message === undefined || err.message === null ? err : err.message}`,
			" | criado em: ",
			`${moment().format("LLLL[.]")}`
		);

		if (err instanceof ValidationError) {
			let errosFinal: any[] = [];
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
		} else if (err instanceof RequestValidationError) {
			return res.status(err.code).json({
				status: 400,
				code: err.codeSystem,
				erros: err.erros
			});
		} else if (err instanceof AppError) {
			return res.status(err.status).json({
				status: 400,
				erros: [{ msg: err.message }]
			});
		} else {
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
			} else {
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
}
