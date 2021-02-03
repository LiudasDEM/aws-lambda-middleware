import { IAPIGatewayMiddlewareArgs } from '../interfaces/IAPIGatewayMiddlewareHandler';
import Ware from '../abstract/Ware';


export default class HeadersFixer extends Ware<IAPIGatewayMiddlewareArgs> {
	constructor() {
		super();
	}

	static uppercaseHeader(key: string): string {
		const capitalize = (input: string) => input.charAt(0).toUpperCase() + input.slice(1);

		return key
			.split('-')
			.map(capitalize)
			.join('-');
	}

	async run({ event }: IAPIGatewayMiddlewareArgs): Promise<void> {
		if (!event.headers) {
			return;
		}

		event.headers = Object
			.entries(event.headers)
			.reduce((acc, [k, v]) => ({
				...acc,
				[HeadersFixer.uppercaseHeader(k)]: v,
			}), {});
	}
}
