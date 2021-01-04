import BaseMiddlewareHandler from '../abstract/BaseMiddlewareHandler';


export default abstract class Ware<ArgsType = unknown> extends BaseMiddlewareHandler {
	constructor() {
		super();
	}

	abstract run(args: ArgsType): Promise<void>;
}
