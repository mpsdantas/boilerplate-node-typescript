import { Request, Response } from "express";
import { Controller, Delete, Get, Post, Put, Req, Res } from "routing-controllers";
import { Welcome } from "../models/welcome.model";
import { WelcomeService } from "../services/welcome.service";

@Controller("/welcome")
export class WelcomeController {
  private welcomeService = new WelcomeService();
  
  @Post("/")
  async create(@Req() req: any, @Res() res: any) {
    return this.welcomeService.create(req.body);
  }

  @Put("/:id")
  async update(req: Request, res: Response, next: any) {
    return this.welcomeService.update(req.body.id, req.body);
  }

  @Get("/")
  async getAll(req: Request, res: Response, next: any): Promise<Welcome[]>{
    return this.welcomeService.findAll();
  }

  @Get("/:id")
  async getById(req: Request, res: Response, next: any) {
    return this.welcomeService.findById(req.body.id);
  }

  @Delete("/:id")
  async remove(req: Request, res: Response, next: any) {
    return this.welcomeService.delete(req.body.id);
  }
}
