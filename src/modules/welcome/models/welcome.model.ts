import { prop, Typegoose } from "typegoose";

export class Welcome extends Typegoose {
  @prop()
  mensagem?: string;

  @prop({ required: [true, `O campo assunto é obrigatório`] })
  assunto?: string;
}

export const WelcomeModel = new Welcome().getModelForClass(Welcome, {
  schemaOptions: { versionKey: false }
});
