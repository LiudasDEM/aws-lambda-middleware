import type { APIGatewayEvent, Context } from 'aws-lambda';

import HttpResponse from '../responses/HttpResponse';
import IHttpResponseParts from '../interfaces/IHttpResponseParts';

export type IAPIGatewayProxyHandler<ParsedProxyEventType = unknown> = (parsedEvent: ParsedProxyEventType, event: APIGatewayEvent, context: Context) => Promise<IHttpResponseParts | HttpResponse>
export type IAPIGatewayProxyHandlerAWS = (event: APIGatewayEvent, context: Context) => Promise<IHttpResponseParts>

export default IAPIGatewayProxyHandler;
