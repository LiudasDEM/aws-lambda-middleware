import HttpError from './HttpError';

export default class BadRequest extends HttpError {
	constructor(extra?: string | Record<string, string>) {
		super(400, 'BadRequest', extra);
	}
}
