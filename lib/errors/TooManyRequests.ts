import HttpError from './HttpError';

export default class Forbidden extends HttpError {
	constructor(extra?: string | Record<string, string>) {
		super(429, 'TooManyRequests', extra);
	}
}
