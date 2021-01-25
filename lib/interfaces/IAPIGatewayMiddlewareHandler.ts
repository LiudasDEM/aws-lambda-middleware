import type { APIGatewayEvent, Context } from 'aws-lambda';

export interface IAPIGatewayMiddlewareArgs<ParsedProxyEventType = unknown> {
	parsedEvent: ParsedProxyEventType;
	event: APIGatewayEvent;
	context: Context;
}

type IAPIGatewayMiddlewareHandler = (args: IAPIGatewayMiddlewareArgs) => Promise<IAPIGatewayMiddlewareArgs>

export default IAPIGatewayMiddlewareHandler;
