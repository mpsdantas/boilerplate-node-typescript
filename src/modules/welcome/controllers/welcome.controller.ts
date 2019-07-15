import "reflect-metadata";
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Req,
  Res
} from "routing-controllers";

import { Request, Response } from "express";

import Welcome from "../models/welcome.model";

import GenericController from "../../commom/generics/generic.controller";

@Controller("/welcome")
export class WelcomeController {
  // constructor() {
  // 	super(Welcome);
  // }

  @Post("/")
  async create(@Req() req: any, @Res() res: any) {
    throw new Error("CUCUCUCUCU");
  }

  // @Put("/:id")
  // async update(req: Request, res: Response, next: any) {
  // 	return super.update(req, res, next);
  // }

  // @Get('/')
  // async getAll(req: Request, res: Response, next: any) {
  // 	return super.getAll(req, res, next);
  // }

  // @Get("/:id")
  // async getById(req: Request, res: Response, next: any) {
  // 	return super.getById(req, res, next);
  // }

  // @Delete("/:id")
  // async remove(req: Request, res: Response, next: any) {
  // 	return super.remove(req, res, next);
  // }
}
