import {
	Controller,
	Param,
	Body,
	Get,
	Post,
	Put,
	Delete
} from "routing-controllers";

import { Request, Response } from "express";

import Welcome from '../models/Welcome';

import Transaction from 'mongoose-transactions-typescript';

@Controller("/welcome")
export class WelcomeController{
	
	@Get("/")
	public index: any = (req: Request, res: Response, next: any) => {
		return {
			status: true,
			msg:
				"Bem vindo ao boilerplate de aplicações Node.js com Typescript desenvolvido por Marcus Dantas"
		};
	};

	@Post("/save")
	public save: any = async (req: Request, res: Response, next: any) => {
		
		const transaction = new Transaction();

		try {
			const idWelcome1 = transaction.insert('Welcome', {mensagem: 'adada', assunto: "asdasd"});
			const idWelcome2 = transaction.insert('Welcome', {mensagem: 'a121dada'});

			const final = await transaction.run()
			
		} catch (exception) {
			const rollbackObj = await transaction.rollback().catch(console.error)
			transaction.clean()  
			throw exception.error;
		}

		return {
			status: true,
			msg: "Objeto salvo com sucesso."
		};
	};
}
