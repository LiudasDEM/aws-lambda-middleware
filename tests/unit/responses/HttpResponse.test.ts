import 'mocha';
import assert from 'assert';

import HttpResponse from '../../../lib/responses/HttpResponse';


describe('HTTP HttpResponse response class', function () {
	it('should construct response with status 200', function () {
		const res = new HttpResponse();
		assert.deepStrictEqual(res.statusCode, 200);
	});

	it('should use statusCode, body and headers from constructor', function () {
		const res = new HttpResponse(202, 'Accepted', {
			'Content-Type': 'text/plain',
		});

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 202,
			body: 'Accepted',
			headers: {
				'Content-Type': 'text/plain',
			},
		});
	});
});
