import HttpError from './HttpError';

export default class NotFound extends HttpError {
	constructor(message = 'NotFound', extra?: string) {
		super(404, message, extra);
	}
}
