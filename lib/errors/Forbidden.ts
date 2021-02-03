import HttpError from './HttpError';

export default class Forbidden extends HttpError {
	constructor(extra?: string) {
		super(403, 'Forbidden', extra);
	}
}
