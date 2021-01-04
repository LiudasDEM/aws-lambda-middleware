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
});
