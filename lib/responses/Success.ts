import HttpResponse from '../responses/HttpResponse';

import IHeaders from '../interfaces/IHeaders';


export default class Success extends HttpResponse {
	constructor(body?: unknown, headers?: IHeaders) {
		super(200, body, headers);
	}
}
