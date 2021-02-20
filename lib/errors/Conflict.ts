import HttpError from './HttpError';

export default class Conflict extends HttpError {
	constructor(extra?: string | Record<string, string>) {
		super(409, 'Conflict', extra);
	}
}
