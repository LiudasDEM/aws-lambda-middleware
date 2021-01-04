import Wrap from '../abstract/Wrap';
import Ware from '../abstract/Ware';
import BaseMiddlewareHandler from '../abstract/BaseMiddlewareHandler';


export default abstract class BaseMiddleware
	<ReturnFunctionType, WrapFunctionType = unknown, WareFunctionArgs = unknown> {
	protected wares: Array<Ware<WareFunctionArgs>>;
	protected wraps: Array<Wrap<WrapFunctionType>>;

	constructor() {
		this.wares = [];
		this.wraps = [];
	}

	add(wareOrWrap: BaseMiddlewareHandler): BaseMiddleware<ReturnFunctionType, WrapFunctionType, WareFunctionArgs> {
		if (wareOrWrap instanceof Wrap) {
			this.wraps.push(wareOrWrap);
		}
		if (wareOrWrap instanceof Ware) {
			this.wares.push(wareOrWrap);
		}
		return this;
	}

	abstract getHandler(): ReturnFunctionType;
}
