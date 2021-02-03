import 'mocha';
import assert from 'assert';

import Created from '../../../lib/responses/Created';
import HttpResponse from '../../../lib/responses/HttpResponse';


describe('HTTP Created response class', function () {
	it('should construct response with status 201', function () {
		const res = new Created();
		assert.deepStrictEqual(res.statusCode, 201);
	});

	it('should generate response with headers', function () {
		const res = new Created('http://localhost:8080/location');

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 201,
			headers: {
				Location: 'http://localhost:8080/location',
			},
			body: 'null',
		});
	});

	it('should be HttpResponse instance', function () {
		const res = new Created();
		assert(res instanceof HttpResponse);
	});
});
