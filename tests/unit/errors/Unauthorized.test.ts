
import 'mocha';
import assert from 'assert';

import Unauthorized from '../../../lib/errors/Unauthorized';
import HttpError from '../../../lib/errors/HttpError';


describe('HTTP BadRequest error class', function () {
	it('should construct response with status 401', function () {
		const error = new Unauthorized();
		assert.deepStrictEqual(error.statusCode, 401);
	});

	it('should generate response with headers and body with message and extra', function () {
		const res = new Unauthorized({ error: 'Get a token geez!' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 401,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'Unauthorized', extra: { error: 'Get a token geez!' } }),
		});
	});

	it('should be HttpError instance', function () {
		const error = new Unauthorized();
		assert(error instanceof HttpError);
	});
});
