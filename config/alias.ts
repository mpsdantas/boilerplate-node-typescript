import moduleAlias from "module-alias";

moduleAlias.addAliases({
    controllers: __dirname + "/../" + "src/controllers",
    middlewares: __dirname + "/../" +"src/middlewares",
    models: __dirname + "/../" +"src/models",
    routes: __dirname + "/../" +"src/routes",
    app: __dirname + "/../" +"src",
    utils: __dirname + "/../" +"src/utils",
    validators: __dirname + "/../" +"src/validators",
    config: __dirname + "/../" +"config",
    modules: __dirname + "/../" +"src/modules"
});

export default moduleAlias;