export = index;
declare class index {
	constructor(useDb: any);
	rollbackIndex: any;
	useDb: any;
	transactionId: any;
	operations: any;
	clean(): any;
	createTransaction(): any;
	findByIdTransaction(model: any, findId: any): any;
	getOperations(transactionId: any): any;
	getTransactionId(): any;
	insert(modelName: any, data: any, options: any): any;
	insertTransaction(model: any, data: any): any;
	loadDbTransaction(transactionId: any): any;
	remove(modelName: any, findId: any, options: any): void;
	removeDbTransaction(transactionId: any): any;
	removeTransaction(model: any, id: any): any;
	rollback(howmany: any): any;
	run(): any;
	saveOperations(): any;
	transactionError(error: any, data: any): any;
	update(modelName: any, findId: any, data: any, options: any): void;
	updateDbTransaction(status: any): any;
	updateOperationStatus(status: any, index: any): void;
	updateTransaction(model: any, id: any, data: any, options: any): any;
}
