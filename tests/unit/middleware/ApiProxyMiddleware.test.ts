import 'mocha';
import assert from 'assert';
import { apiGatewayEvent, context } from '../../mock';

import ApiProxyMiddleware from '../../../lib/middleware/ApiProxyMiddleware';
import ErrorHandler from '../../../lib/proxy/ErrorHandler';
import BodyParser from '../../../lib/proxy/BodyParser';
import HeadersFixer from '../../../lib/proxy/HeadersFixer';

import { IAPIGatewayProxyHandler } from '../../../lib/interfaces/IAPIGatewayProxyHandler';

import HttpResponse from '../../../lib/responses/HttpResponse';
import HttpError from '../../../lib/errors/HttpError';


describe('ApiProxyMiddleware class', function () {
	it('should return handler with empty parsedEvent when no middleware is passed', async function () {
		const proxyHandler: IAPIGatewayProxyHandler<unknown> = async (parsedEvent) => {
			assert.deepStrictEqual(parsedEvent, {});
			return new HttpResponse(200);
		};

		const handler = new ApiProxyMiddleware(proxyHandler).getHandler();

		await handler(apiGatewayEvent(), context());
	});


	it('should create aws proxy handler parse body of given handler\'s event', async function () {
		const proxyHandler: IAPIGatewayProxyHandler<{ body: { key: 'string' } }> = async (parsedEvent) => {
			assert.deepStrictEqual(parsedEvent.body, { key: 'value' });
			return new HttpResponse(200);
		};

		const handler = new ApiProxyMiddleware(proxyHandler)
			.add(new BodyParser())
			.getHandler();

		await handler(apiGatewayEvent({ body: JSON.stringify({ key: 'value' }) }), context());
	});

	it('should catch all thrown errors when handler is wrapped', async function () {
		console.error = () => { };
		const proxyHandler: IAPIGatewayProxyHandler = async () => {
			throw new HttpError(400, 'TESTING THROWING');
		};

		const handler = new ApiProxyMiddleware(proxyHandler)
			.add(new ErrorHandler())
			.getHandler();

		const res = await handler(apiGatewayEvent(), context());

		assert.deepStrictEqual(res, {
			body: JSON.stringify({ message: 'TESTING THROWING' }),
			headers: { 'Content-Type': 'application/json' },
			statusCode: 400,
		});
	});

	it('should uppercase all headers when HeadersFixer is added', async function () {
		console.error = () => { };
		const proxyHandler: IAPIGatewayProxyHandler = async (_, event) => {
			assert.deepStrictEqual(event.headers, {
				'First': 'first',
				'Second': 'second',
				'Third-Fourth': 'third-fourth',
				'Fifth-Sixth-Seventh': 'fifth-sixth-seventh',
			});

			return new HttpResponse().getResponse();
		};

		const handler = new ApiProxyMiddleware(proxyHandler)
			.add(new HeadersFixer())
			.getHandler();

		await handler(apiGatewayEvent({
			headers: {
				'first': 'first',
				'Second': 'second',
				'Third-fourth': 'third-fourth',
				'fifth-Sixth-seventh': 'fifth-sixth-seventh',
			},
		}), context());
	});
});
