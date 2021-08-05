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

	it('should allow to access body and headers', function () {
		const res = new HttpResponse(200, {}, {
			'Content-Type': 'application/json',
		});

		assert.deepStrictEqual(res.headers, {
			'Content-Type': 'application/json',
		});

		assert.deepStrictEqual(res.body, '{}');
	});

	describe('HTTP HttpResponse response class with expanded headers', function () {
		before(function () {
			HttpResponse.expandDefaultHeaders({ 'X-Content-Type-Options': 'nosniff' });
		});

		after(function () {
			HttpResponse.defaultHeaders = { 'Content-Type': 'application/json' };
		});

		it('should expand default headers', function () {
			const res = new HttpResponse(200, {});

			assert.deepStrictEqual(res.headers, {
				'Content-Type': 'application/json',
				'X-Content-Type-Options': 'nosniff',
			});

			assert.deepStrictEqual(res.body, '{}');
		});
	});

	describe('HTTP HttpResponse response class with expanded mandatory headers', function () {
		before(function () {
			HttpResponse.expandMandatoryHeaders({ 'X-Content-Type-Options': 'nosniff' });
		});

		after(function () {
			HttpResponse.mandatoryHeaders = {};
		});

		it('should expand mandatory headers and add to response when headers are not set', function () {
			const res = new HttpResponse(200, {});

			assert.deepStrictEqual(res.headers, {
				'Content-Type': 'application/json',
				'X-Content-Type-Options': 'nosniff',
			});

			assert.deepStrictEqual(res.body, '{}');
		});

		it('should expand mandatory headers and add to response when headers are set', function () {
			const res = new HttpResponse(200, {}, { 'Content-Type': 'application/json' });

			assert.deepStrictEqual(res.headers, {
				'Content-Type': 'application/json',
				'X-Content-Type-Options': 'nosniff',
			});

			assert.deepStrictEqual(res.body, '{}');
		});
	});
});
