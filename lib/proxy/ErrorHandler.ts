import { IAPIGatewayProxyHandler } from '../interfaces/IAPIGatewayProxyHandler';
import Wrap from '../abstract/Wrap';

import HttpError from '../errors/HttpError';


export default class ErrorHandler extends Wrap<IAPIGatewayProxyHandler<unknown>> {
	constructor() {
		super();
	}

	run(fn: IAPIGatewayProxyHandler<unknown>): IAPIGatewayProxyHandler<unknown> {
		return async function (parsedEvent, event, context) {
			try {
				return await fn(parsedEvent, event, context)
			} catch (e) {
				console.error(e);
				return HttpError.buildError(e);
			}
		}
	}
}
