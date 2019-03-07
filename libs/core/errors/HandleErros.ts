import { Request, Response } from "express";

import mongoose from "mongoose";

import AppError from "./AppError";

import log from "@utils/log";

import {
	Middleware,
	ExpressErrorMiddlewareInterface
} from "routing-controllers";

import moment from "moment";

import "moment/locale/pt-br";

const ValidationError = mongoose.Error.ValidationError;

@Middleware({ type: "after" })
export class HandleErros implements ExpressErrorMiddlewareInterface {
	error(error: any, request: any, response: any, next: (err: any) => any) {
		HandleErros.catchAllErros(error, request, response, next);
	}

	public createLogError: any = (err: any, req: any) => {
		log.error(
			`| ROTA: ${req.path} | Exception: `,
			err,
			" | criado em: ",
			`${moment().format("LLLL[.]")}`
		);
	};

	public responseErrorDupKey: any = (err: any, res: any) => {
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
	};

	public responseValidationError: any = (err: any, res: any) => {
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
	};

	public responseAppError: any = (err: any, res: any) => {
		return res.status(400).json({
			status: 400,
			codeError: err.codeError,
			erros: err.erros
		});
	};

	public responseError: any = (err: any, res: any) => {
		return res.status(500).json({
			status: 500,
			erros: [
				{
					msg: err.message
				}
			]
		});
	};

	public reponseErrorNotMap: any = (err: any, res: any) => {
		return res.status(500).json({
			status: 500,
			erros: [
				{
					msg: `Erro não mapeado pelo servidor.`
				}
			],
			typeErro: err
		});
	};

	static catchAllErros: any = (
		err: any,
		req: Request,
		res: Response,
		next: any
	) => {
		const handleErros = new HandleErros();

		handleErros.createLogError(err, req);

		if (err instanceof ValidationError) {
			return handleErros.responseValidationError(err, res);
		} else if (err instanceof AppError) {
			return handleErros.responseAppError(err, res);
		} else if (err instanceof Error) {
			return handleErros.responseError(err, res);
		} else {
			if (err.message.indexOf("duplicate key error") !== -1) {
				return handleErros.responseErrorDupKey(err, res);
			} else {
				return handleErros.reponseErrorNotMap(err, res);
			}
		}

	};
}
