import 'mocha';
import assert from 'assert';

import BadRequest from '../../../lib/errors/BadRequest';
import HttpError from '../../../lib/errors/HttpError';


describe('HTTP BadRequest error class', function () {
	it('should construct response with status 400', function () {
		const error = new BadRequest();
		assert.deepStrictEqual(error.statusCode, 400);
	});

	it('should generate response with headers and body with message and extra', function () {
		const res = new BadRequest({ error: 'ValidationError' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 400,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'BadRequest', extra: { error: 'ValidationError' } }),
		});
	});

	it('should be HttpError instance', function () {
		const error = new BadRequest();
		assert(error instanceof HttpError);
	});
});
