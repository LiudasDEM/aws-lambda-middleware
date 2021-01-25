import { IAPIGatewayMiddlewareArgs } from '../interfaces/IAPIGatewayMiddlewareHandler';
import Ware from '../abstract/Ware';


export default class BodyParser extends Ware<IAPIGatewayMiddlewareArgs> {
	constructor() {
		super();
	}

	async run({ parsedEvent, event }: IAPIGatewayMiddlewareArgs<{ body: unknown }>): Promise<void> {
		if (event.headers['Content-Type'] && event.headers['Content-Type'].includes('application/json')) {
			parsedEvent.body = event.body ? JSON.parse(event.body) : null;
		}
		if (event.headers['content-type'] && event.headers['content-type'].includes('application/json')) {
			parsedEvent.body = event.body ? JSON.parse(event.body) : null;
		}
		return;
	}
}
