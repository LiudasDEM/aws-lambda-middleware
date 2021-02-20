import HttpError from './HttpError';

export default class Forbidden extends HttpError {
	constructor(extra?: string | Record<string, string>) {
		super(405, 'MethodNotAllowed', extra);
	}
}
