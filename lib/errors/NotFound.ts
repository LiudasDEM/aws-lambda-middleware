import HttpError from './HttpError';

export default class NotFound extends HttpError {
	constructor(extra?: string | Record<string, string>) {
		super(404, 'NotFound', extra);
	}
}
