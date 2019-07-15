import AppModule from "./commom/interfaces/appModule.interface";
import { WelcomeModule } from "./welcome/welcome.module";

export const Modules: AppModule = {
  modules: [WelcomeModule]
};
