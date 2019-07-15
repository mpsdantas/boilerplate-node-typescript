import Module from "../commom/interfaces/module.interface";

import { WelcomeController } from "./controllers/welcome.controller";

import WelcomeModel from "./models/welcome.model";

export const WelcomeModule: Module = {
  controllers: [WelcomeController],
  models: [WelcomeModel]
};
