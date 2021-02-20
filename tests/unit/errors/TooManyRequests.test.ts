
import 'mocha';
import assert from 'assert';

import TooManyRequests from '../../../lib/errors/TooManyRequests';
import HttpError from '../../../lib/errors/HttpError';


describe('HTTP BadRequest error class', function () {
	it('should construct response with status 429', function () {
		const error = new TooManyRequests();
		assert.deepStrictEqual(error.statusCode, 429);
	});

	it('should generate response with headers and body with message and extra', function () {
		const res = new TooManyRequests({ error: 'No DDOS allowed!' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 429,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'TooManyRequests', extra: { error: 'No DDOS allowed!' } }),
		});
	});

	it('should be HttpError instance', function () {
		const error = new TooManyRequests();
		assert(error instanceof HttpError);
	});
});
