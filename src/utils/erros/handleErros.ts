import { Request, Response } from "express";

import mongoose from "mongoose";

import AppError from "./AppError";

import RequestValidationError from "./RequestValidationError";

import log from 'utils/log';

const notFound = (req: Request, res: Response, next: any) => {
	const err = new RequestValidationError(
		[
			{
				msg: `Nenhuma rota encontrada para ${req.path}`
			}
		],
		404,
		100
	);

	next(err);
};

const catchErrors: any = (fn: any) => {
	return function(req: Request, res: Response, next: any) {
		return fn(req, res, next).catch(next);
	};
};

const catchAllErros = (
	err: any,
	req: Request,
	res: Response,
	next: any
) => {
	err == undefined
		? new Error(
				"Erro de processamento interno. (O erro informado no construtor é undefined)"
		  )
		: err.error !== undefined
		? err.error
		: err;

	const ValidationError = mongoose.Error.ValidationError;

	log.error(
		`| ROTA: ${req.path} | Exception: `,
		err,
		" | criado em: ",
		new Date().toJSON()
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
			status: false,
			code: parseInt("100"),
			erros: errosFinal
		});
	} else if (err instanceof RequestValidationError) {
		return res.status(err.code).json({
			status: false,
			code: err.codeSystem,
			erros: err.erros
		});
	} else if (err instanceof AppError) {
		return res.status(err.status).json({
			status: false,
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
				status: false,
				erros: [
					{
						msg: `O ${campo} já foi utilizado por outro usuário, tente utilizar outro valor diferente de ${dup_key}`
					}
				]
			});
		} else {
			return res.status(500).json({
				status: false,
				erros: [{ msg: err.message }]
			});
		}
	}
};

export default { notFound, catchErrors, catchAllErros };
