import HttpError from './HttpError';

export default class Conflict extends HttpError {
	constructor(message = 'Conflict', extra?: string) {
		super(409, message, extra);
	}
}
