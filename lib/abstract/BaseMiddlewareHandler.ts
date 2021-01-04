export default abstract class BaseMiddlewareHandler {
	constructor() { }
	abstract run(...args: Array<unknown>): unknown;
}
