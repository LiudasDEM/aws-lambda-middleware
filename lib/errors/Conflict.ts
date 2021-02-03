import HttpError from './HttpError';

export default class Conflict extends HttpError {
	constructor(extra?: string) {
		super(409, 'Conflict', extra);
	}
}
