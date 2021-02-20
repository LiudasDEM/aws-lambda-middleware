import { IAPIGatewayMiddlewareArgs } from '../interfaces/IAPIGatewayMiddlewareHandler';
import Ware from '../abstract/Ware';


export default class BodyParser extends Ware<IAPIGatewayMiddlewareArgs> {
	constructor() {
		super();
	}

	static parse<T = unknown>(body: string): T {
		return body ? JSON.parse(body) : null;
	}

	async run({ parsedEvent, event }: IAPIGatewayMiddlewareArgs<{ body: unknown }>): Promise<void> {
		if (event.headers['Content-Type'] && event.headers['Content-Type'].includes('application/json')) {
			parsedEvent.body = BodyParser.parse(event.body);
		}
		if (event.headers['content-type'] && event.headers['content-type'].includes('application/json')) {
			parsedEvent.body = BodyParser.parse(event.body);
		}
		return;
	}
}
