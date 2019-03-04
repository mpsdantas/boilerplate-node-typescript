import req from "supertest";

import server from "../config/app";

test("[GET] /", async () => {
	const res = await req(server).get("/api");
	expect(res.text).toBe(
		'{"status":true,"msg":"Bem vindo ao boilerplate de aplicações Node.js com Typescript desenvolvido por Marcus Dantas"}'
	);
});
