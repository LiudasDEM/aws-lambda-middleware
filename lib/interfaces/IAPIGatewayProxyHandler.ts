import type { APIGatewayEvent, Context } from 'aws-lambda';

import HttpResponse from '../responses/HttpResponse';
import IParsedProxyEvent from '../interfaces/IParsedProxyEvent';
import IHttpResponseParts from '../interfaces/IHttpResponseParts';

export type IAPIGatewayProxyHandler<ParsedBodyType> = (parsedEvent: IParsedProxyEvent<ParsedBodyType>, event: APIGatewayEvent, context: Context) => Promise<IHttpResponseParts | HttpResponse>
export type IAPIGatewayProxyHandlerAWS = (event: APIGatewayEvent, context: Context) => Promise<IHttpResponseParts>

export default IAPIGatewayProxyHandler;
