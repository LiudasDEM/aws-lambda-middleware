import HttpError from './HttpError';

export default class Unauthorized extends HttpError {
	constructor(extra?: string | Record<string, string>) {
		super(401, 'Unauthorized', extra);
	}
}
