import 'mocha';
import assert from 'assert';

import Conflict from '../../../lib/errors/Conflict';
import HttpError from '../../../lib/errors/HttpError';


describe('HTTP BadRequest error class', function () {
	it('should construct response with status 409', function () {
		const error = new Conflict();
		assert.deepStrictEqual(error.statusCode, 409);
	});

	it('should generate response with headers and body with message and extra', function () {
		const res = new Conflict({ error: 'ConflictedSituation' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 409,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'Conflict', extra: { error: 'ConflictedSituation' } }),
		});
	});

	it('should be HttpError instance', function () {
		const error = new Conflict();
		assert(error instanceof HttpError);
	});
});
