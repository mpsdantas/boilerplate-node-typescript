import {
	Controller,
	Param,
	Body,
	Get,
	Post,
	Put,
	Delete
} from "routing-controllers";

import mongoose from "mongoose";

import { Request, Response } from "express";

import AbstractController from "../abstracts/AbstractController";

export default class GenericController extends AbstractController {
	constructor(ObjectModel: mongoose.Model<InstanceType<any>>) {
		super(ObjectModel);
	}

	async create(req: Request, res: Response, next: any) {
		const { body } = req.body;

		//TODO: Adicionar throw com erro caso body for undefined;

		const newObject = new this.ObjectModel(body);

		await newObject.save(body);

		return {
			status: 200,
			msg: "Objeto salvo com sucesso.",
			idObject: newObject._id
		};
	}

	async update(req: Request, res: Response, next: any) {
		const { id } = req.params;

		const { body } = req.body;

		const objectUpdate = await this.ObjectModel.findOneAndUpdate(
			{ _id: id },
			{ $set: body }
		);

		//TODO: Adicionar throw com erro caso update não der certo.

		return {
			status: 200,
			msg: "Objeto atualizado com sucesso.",
			idObject: objectUpdate._id
		};
	}

	async getAll(req: Request, res: Response, next: any){
		const objects = await this.ObjectModel.find();

		return {
			status: 200,
			msg: "Consulta realizada com sucesso.",
			results: objects
		};
	}

	async getById(req: Request, res: Response, next: any) {
		const { id } = req.params;

		const object = await this.ObjectModel.findOne({ _id: id });

		return {
			status: 200,
			msg: "Consulta realizada com sucesso.",
			result: object
		};
	}

	async remove(req: Request, res: Response, next: any) {
		const { id } = req.params;

		await this.ObjectModel.remove({ _id: id });

		return {
			status: 200,
			msg: "Objeto removido com sucesso."
		};
	}
}
