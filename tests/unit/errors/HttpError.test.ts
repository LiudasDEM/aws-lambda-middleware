import 'mocha';
import assert from 'assert';

import HttpError from '../../../lib/errors/HttpError';


describe('HTTP HttpError error class', function () {
	it('should construct error with status 500', function () {
		const error = new HttpError();
		assert.deepStrictEqual(error.statusCode, 500);
	});

	it('should be Error instance', function () {
		const error = new HttpError();
		assert(error instanceof Error);
	});

	it('should have stack property', function () {
		const error = new HttpError();
		assert(error.stack);
	});

	it('should build 500 error from non HttpError instance', function () {
		const error = new Error('Unrecognised');
		const httpError = HttpError.buildError(error);

		assert.deepStrictEqual(httpError.getResponse(), {
			headers: {
				'Content-Type': 'application/json',
			},
			statusCode: 500,
			body: JSON.stringify({ message: 'Unrecognised', stack: error.stack }),
		});
	});

	it('should have getResponse function', function () {
		const error = new HttpError();

		assert.deepStrictEqual(error.getResponse(), {
			headers: {
				'Content-Type': 'application/json',
			},
			statusCode: 500,
			body: JSON.stringify({ message: 'InternalServerError' }),
		});
	});

	it('should have statusCode, body and extra as public get properties', function () {
		const error = new HttpError();

		assert.deepStrictEqual(error.statusCode, 500);
		assert.deepStrictEqual(error.body, JSON.stringify({ message: 'InternalServerError' }));
		assert.deepStrictEqual(error.extra, undefined);
	});
});
