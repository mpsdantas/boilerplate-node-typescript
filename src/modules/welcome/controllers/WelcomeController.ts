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

import Welcome from "../models/Welcome";

import GenericController from "@app/core/generics/GenericController";

import AppError from '../../../core/erros/AppError';


@Controller("/welcome")
export class WelcomeController extends GenericController {
	
	constructor() {
		super(Welcome);
	}

	@Post('/')
	async create(req: Request, res: Response, next: any) {
		return super.create(req, res, next);
	}

	@Put("/:id")
	async update(req: Request, res: Response, next: any) {
		return super.update(req, res, next);
	}

	@Get('/')
	public testeErro: any = (req: Request, res: Response, next: any) => {
		throw new AppError([{msg: "testes"}], 100)
	}
	// async getAll(req: Request, res: Response, next: any) {
	// 	return super.getAll(req, res, next);
	// }

	@Get("/:id")
	async getById(req: Request, res: Response, next: any) {
		return super.getById(req, res, next);
	}

	@Delete("/:id")
	async remove(req: Request, res: Response, next: any) {
		return super.remove(req, res, next);
	}
}
