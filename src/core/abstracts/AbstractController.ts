import mongoose from "mongoose";

import InterfaceController from "../interfaces/InterfaceController";

import { Request, Response } from "express";

export default abstract class AbstractController
	implements InterfaceController {
	ObjectModel: any;

	abstract async create(req: Request, res: Response, next: any): Promise<any>;

	abstract async update(req: Request, res: Response, next: any): Promise<any>;

	abstract async getAll(req: Request, res: Response, next: any): Promise<any>;

	abstract async getById(req: Request, res: Response, next: any): Promise<any>;

	abstract async remove(req: Request, res: Response, next: any): Promise<any>;

	constructor(ObjectModel: mongoose.Model<InstanceType<any>>) {
		this.ObjectModel = ObjectModel;
	}
}
