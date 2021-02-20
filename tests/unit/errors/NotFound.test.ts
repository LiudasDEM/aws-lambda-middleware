import 'mocha';
import assert from 'assert';

import NotFound from '../../../lib/errors/NotFound';
import HttpError from '../../../lib/errors/HttpError';


describe('HTTP BadRequest error class', function () {
	it('should construct response with status 404', function () {
		const error = new NotFound();
		assert.deepStrictEqual(error.statusCode, 404);
	});

	it('should generate response with headers and body with message and extra', function () {
		const res = new NotFound({ error: 'Try searching for different resources' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 404,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'NotFound', extra: { error: 'Try searching for different resources' } }),
		});
	});

	it('should be HttpError instance', function () {
		const error = new NotFound();
		assert(error instanceof HttpError);
	});
});
