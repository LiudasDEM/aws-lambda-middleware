import 'mocha';
import assert from 'assert';

import PayloadTooLarge from '../../../lib/errors/PayloadTooLarge';
import HttpError from '../../../lib/errors/HttpError';


describe('HTTP BadRequest error class', function () {
	it('should construct response with status 413', function () {
		const error = new PayloadTooLarge();
		assert.deepStrictEqual(error.statusCode, 413);
	});

	it('should generate response with headers and body with message and extra', function () {
		const res = new PayloadTooLarge({ error: 'You should come up with smaller requests' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 413,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'PayloadTooLarge', extra: { error: 'You should come up with smaller requests' } }),
		});
	});

	it('should be HttpError instance', function () {
		const error = new PayloadTooLarge();
		assert(error instanceof HttpError);
	});
});
