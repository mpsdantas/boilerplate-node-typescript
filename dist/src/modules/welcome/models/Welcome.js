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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
class Welcome extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Welcome.prototype, "mensagem", void 0);
__decorate([
    typegoose_1.prop({ required: [true, `O campo assunto é obrigatório`] }),
    __metadata("design:type", String)
], Welcome.prototype, "assunto", void 0);
const WelcomeRepository = new Welcome().getModelForClass(Welcome, {
    existingMongoose: mongoose_1.default,
    schemaOptions: { collection: "welcomes" }
});
exports.default = WelcomeRepository;
