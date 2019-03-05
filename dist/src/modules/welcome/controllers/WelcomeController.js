"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const mongoose_transactions_typescript_1 = __importDefault(require("mongoose-transactions-typescript"));
let WelcomeController = class WelcomeController {
    constructor() {
        this.index = (req, res, next) => {
            return {
                status: true,
                msg: "Bem vindo ao boilerplate de aplicações Node.js com Typescript desenvolvido por Marcus Dantas"
            };
        };
        this.save = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const transaction = new mongoose_transactions_typescript_1.default();
            try {
                const idWelcome1 = transaction.insert('Welcome', { mensagem: 'adada', assunto: "asdasd" });
                const idWelcome2 = transaction.insert('Welcome', { mensagem: 'a121dada' });
                const final = yield transaction.run();
            }
            catch (exception) {
                const rollbackObj = yield transaction.rollback().catch(console.error);
                transaction.clean();
                throw exception.error;
            }
            return {
                status: true,
                msg: "Objeto salvo com sucesso."
            };
        });
    }
};
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Object)
], WelcomeController.prototype, "index", void 0);
__decorate([
    routing_controllers_1.Post("/save"),
    __metadata("design:type", Object)
], WelcomeController.prototype, "save", void 0);
WelcomeController = __decorate([
    routing_controllers_1.Controller("/welcome")
], WelcomeController);
exports.WelcomeController = WelcomeController;
