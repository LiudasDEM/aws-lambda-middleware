import 'mocha';
import assert from 'assert';

import MethodNotAllowed from '../../../lib/errors/MethodNotAllowed';
import HttpError from '../../../lib/errors/HttpError';


describe('HTTP BadRequest error class', function () {
	it('should construct response with status 405', function () {
		const error = new MethodNotAllowed();
		assert.deepStrictEqual(error.statusCode, 405);
	});

	it('should generate response with headers and body with message and extra', function () {
		const res = new MethodNotAllowed({ error: 'This is not allowed!' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 405,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'MethodNotAllowed', extra: { error: 'This is not allowed!' } }),
		});
	});

	it('should be HttpError instance', function () {
		const error = new MethodNotAllowed();
		assert(error instanceof HttpError);
	});
});
