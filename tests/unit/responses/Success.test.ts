import 'mocha';
import assert from 'assert';

import Success from '../../../lib/responses/Success';
import HttpResponse from '../../../lib/responses/HttpResponse';


describe('HTTP Success response class', function () {
	it('should construct response with status 200', function () {
		const res = new Success();
		assert.deepStrictEqual(res.statusCode, 200);
	});

	it('should generate response with headers and stringified body', function () {
		const res = new Success({ message: 'Body shall be stringified' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'Body shall be stringified' }),
		});
	});

	it('should be HttpResponse instance', function () {
		const res = new Success();
		assert(res instanceof HttpResponse);
	});
});
