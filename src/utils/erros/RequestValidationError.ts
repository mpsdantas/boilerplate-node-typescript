import AppError from './AppError';

export default class RequestValidationError extends AppError {
	erros: any[];
	code: number;
	codeSystem: number;
	constructor(erros: any[], code: number, codeSystem: number) {
		super("O processamento de algumas informações não foi realizado.", 400);
		this.code = code;
		this.codeSystem = codeSystem == undefined ? code : codeSystem;
		this.erros = erros;
	}
};
