import app from "./config/app";

import os from "os";

app.listen(process.env.PORT, () => {
	console.log(`
	▒█▄░▒█ █▀▀█ █▀▀▄ █▀▀ ░░▀ █▀▀ 
	▒█▒█▒█ █░░█ █░░█ █▀▀ ░░█ ▀▀█ 
	▒█░░▀█ ▀▀▀▀ ▀▀▀░ ▀▀▀ █▄█ ▀▀▀ 
	`);

	console.log(
		`\n➡➡ The server is online: http://${os.hostname()}:${
			process.env.PORT
		}/, OS: ${os.type()} ${os.release()}. Environment: ${
			process.env.NODE_ENV
		}, with Node.js v${process.versions.node}.`
	);
});
