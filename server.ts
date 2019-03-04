import app from "./config/app";

import os from 'os';

app.listen(process.env.PORT, () => {
	let environment: string = process.argv[2];

	console.log(`
	▒█▄░▒█ █▀▀█ █▀▀▄ █▀▀ ░░▀ █▀▀ 
	▒█▒█▒█ █░░█ █░░█ █▀▀ ░░█ ▀▀█ 
	▒█░░▀█ ▀▀▀▀ ▀▀▀░ ▀▀▀ █▄█ ▀▀▀ 
	`);

	console.log(
		`\n➡➡ The server is online: http://${os.hostname()}:${
			process.env.PORT
		}/, OS: ${os.type()} ${os.release()}. Environment: ${
			environment !== "prod" ? "dev" : "prod"
		}, with Node.js v${process.versions.node}.`
	);
});
