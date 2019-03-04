const fs = require("fs");

let arquivoOriginal = fs.readFileSync("./dist/config/app.js", 'utf8');

arquivoOriginal = arquivoOriginal.replace(`"use strict";`,"");

arquivoOriginal = arquivoOriginal.replace(`require("module-alias/register");`,"");

const buildConfig = `"use strict";\n\nconst moduleAlias = require("module-alias");\n
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
});\n`;

const novoArquivo = buildConfig + arquivoOriginal;

fs.writeFileSync("./dist/config/app.js", novoArquivo);
