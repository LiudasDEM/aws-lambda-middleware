import 'mocha';
import assert from 'assert';

import NoContent from '../../../lib/responses/NoContent';
import HttpResponse from '../../../lib/responses/HttpResponse';


describe('HTTP NoContent response class', function () {
	it('should construct response with status 204', function () {
		const res = new NoContent();
		assert.deepStrictEqual(res.statusCode, 204);
	});

	it('should generate response with headers and empty body', function () {
		const res = new NoContent({ 'Content-Type': 'text/plain' });

		assert.deepStrictEqual(res.getResponse(), {
			statusCode: 204,
			headers: {
				'Content-Type': 'text/plain',
			},
			body: undefined,
		});
	});

	it('should be HttpResponse instance', function () {
		const res = new NoContent();
		assert(res instanceof HttpResponse);
	});
});
