export default class AppError extends Error {
	erros: any[];
	codeError: number;
	constructor(erros: any[], codeError: number) {
		super("O processamento de algumas informações não foi realizado.");
		this.erros = erros;
		this.codeError = codeError;
	}
};
