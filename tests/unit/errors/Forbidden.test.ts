import 'mocha';
import assert from 'assert';

import Forbidden from '../../../lib/errors/Forbidden';
import HttpError from '../../../lib/errors/HttpError';


describe('HTTP BadRequest error class', function () {
	it('should construct response with status 403', function () {
		const error = new Forbidden();
		assert.deepStrictEqual(error.statusCode, 403);
	});

	it('should generate response with headers and body with message and extra', function () {
		const res = new Forbidden({ error: 'You shall not pass' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 403,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'Forbidden', extra: { error: 'You shall not pass' } }),
		});
	});

	it('should be HttpError instance', function () {
		const error = new Forbidden();
		assert(error instanceof HttpError);
	});
});
