import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

import mongoose from "mongoose";

class Welcome extends Typegoose {
	@prop()
    mensagem?: string;
    
    @prop({required: [true, "Esse campo é obrigatorio"]})
    assunto?: string;
}

const WelcomeModel = new Welcome().getModelForClass(Welcome, {
	existingMongoose: mongoose,
	schemaOptions: { collection: "welcomes" }
});

export default WelcomeModel;
