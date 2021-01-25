import type { APIGatewayEvent, Context } from 'aws-lambda';

import BaseMiddleware from '../abstract/BaseMiddleware';

import { IAPIGatewayProxyHandler, IAPIGatewayProxyHandlerAWS } from '../interfaces/IAPIGatewayProxyHandler';
import IHttpResponseParts from '../interfaces/IHttpResponseParts';
import { IAPIGatewayMiddlewareArgs } from '../interfaces/IAPIGatewayMiddlewareHandler';

import HttpResponse from '../responses/HttpResponse';


export default class ApiProxyMiddleware extends BaseMiddleware<IAPIGatewayProxyHandlerAWS, IAPIGatewayProxyHandler, IAPIGatewayMiddlewareArgs> {
	private wrappedFunction: IAPIGatewayProxyHandler;

	constructor(wrappedFunction: IAPIGatewayProxyHandler<any>) {
		super();
		this.wrappedFunction = wrappedFunction;
	}

	getHandler(): IAPIGatewayProxyHandlerAWS {
		return async (initialEvent: APIGatewayEvent, initialContext: Context): Promise<IHttpResponseParts> => {
			// @ts-ignore
			const initialParsedEvent: IParsedProxyEvent = {};

			const fn = async (parsedEvent: unknown, event: APIGatewayEvent, context: Context): Promise<IHttpResponseParts | HttpResponse> => {
				for (const ware of this.wares) {
					await ware.run({ parsedEvent, event, context });
				}
				return await this.wrappedFunction(parsedEvent, event, context);
			}

			let finalFn: IAPIGatewayProxyHandler | null = null;

			for (const wrap of this.wraps) {
				finalFn = wrap.run(fn);
			}

			const res = finalFn
				? await finalFn(initialParsedEvent, initialEvent, initialContext)
				: await fn(initialParsedEvent, initialEvent, initialContext);

			return HttpResponse.buildResponse(res);
		}
	}
}
