import { prop, Typegoose} from "typegoose";

import mongoose from 'mongoose';

class Welcome extends Typegoose {
	@prop()
	mensagem?: string;

	@prop({ required: [true, `O campo assunto é obrigatório`] })
	assunto?: string;
}

const WelcomeModel = new Welcome().getModelForClass(Welcome, {
	existingMongoose: mongoose,
    schemaOptions: { collection: "welcomes" }
});

export default WelcomeModel;
