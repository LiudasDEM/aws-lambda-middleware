import BaseMiddlewareHandler from '../abstract/BaseMiddlewareHandler';


export default abstract class Wrap<FunctionType = unknown> extends BaseMiddlewareHandler {
	constructor() {
		super();
	}

	abstract run(fn: FunctionType): FunctionType;
}
