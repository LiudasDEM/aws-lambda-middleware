import HttpError from './HttpError';

export default class BadRequest extends HttpError {
	constructor(message = 'BadRequest', extra?: string) {
		super(400, message, extra);
	}
}
