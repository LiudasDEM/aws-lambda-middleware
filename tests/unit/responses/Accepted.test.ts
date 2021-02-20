import 'mocha';
import assert from 'assert';

import Accepted from '../../../lib/responses/Accepted';
import HttpResponse from '../../../lib/responses/HttpResponse';


describe('HTTP Accepted response class', function () {
	it('should construct response with status 202', function () {
		const res = new Accepted();
		assert.deepStrictEqual(res.statusCode, 202);
	});

	it('should generate response with headers and empty body', function () {
		const res = new Accepted({ 'Content-Type': 'text/plain' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 202,
			headers: {
				'Content-Type': 'text/plain',
			},
			body: undefined,
		});
	});

	it('should be HttpResponse instance', function () {
		const res = new Accepted();
		assert(res instanceof HttpResponse);
	});
});
