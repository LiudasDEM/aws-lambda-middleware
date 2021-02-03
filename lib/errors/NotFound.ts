import HttpError from './HttpError';

export default class NotFound extends HttpError {
	constructor(extra?: string) {
		super(404, 'NotFound', extra);
	}
}
