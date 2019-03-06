import req from "supertest";

import server from "@config/app";

test("VERIFICANDO INTEGRIDADE DA HOME | [GET] /welcome", async () => {
	const res = await req(server).get("/welcome");

	expect(typeof res).toEqual("object");

	expect(Object.keys(res.body).sort()).toEqual([
		"msg",
		"results",
		"status"
	]);
});
