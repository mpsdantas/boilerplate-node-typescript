import AppModule from "../interfaces/appModule.interface";

export const extractModules = (appModule: AppModule) => {
  let controllers: any = [];

  let middlewares:any = [];

  let models:any = [];

  if(appModule.modules){
    appModule.modules.map(moduleData => {
      let appModuleControllers = moduleData.controllers ? moduleData.controllers : [];
      let appModuleMiddlewares = moduleData.middlewares ? moduleData.middlewares : [];
      let appModuleModels = moduleData.models ? moduleData.models : [];
      
      controllers = [...controllers, ...appModuleControllers];
      
      middlewares = [...middlewares, ...appModuleMiddlewares];

      models = [...models, ...appModuleModels];
    });
  }
 

  return { controllers, middlewares, models };
};
