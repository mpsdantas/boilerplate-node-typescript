import { Request, Response } from "express";

import Welcome from '../models/Welcome';

const index = async (req: Request, res: Response, next: any) => {
	const newWelcome = new Welcome({mensagem: 'Teste de mensagem'});
	
	await newWelcome.save();

	return res.status(200).json({
		status: true,
		msg:
			"Bem vindo ao boilerplate de aplicações Node.js com Typescript desenvolvido por Marcus Dantas"
	});
};

const save = async (req: Request, res: Response, next: any) => {
	const newWelcome = new Welcome({mensagem: 'Teste de mensagem'});

	await newWelcome.save();

	return res.status(200).json({
		status: true,
		msg:
			"Objeto salvo com sucesso."
	});
};

export default {index, save};
