import type { APIGatewayEvent, Context } from 'aws-lambda';

import IParsedProxyEvent from '../interfaces/IParsedProxyEvent';

export interface IAPIGatewayMiddlewareArgs<ParsedBodyType = unknown> {
	parsedEvent: IParsedProxyEvent<ParsedBodyType>;
	event: APIGatewayEvent;
	context: Context;
}

type IAPIGatewayMiddlewareHandler = (args: IAPIGatewayMiddlewareArgs) => Promise<IAPIGatewayMiddlewareArgs>

export default IAPIGatewayMiddlewareHandler;
