import HttpResponse from '../responses/HttpResponse';

import IHeaders from '../interfaces/IHeaders';


export default class NoContent extends HttpResponse {
	constructor(headers?: IHeaders) {
		super(204, undefined, headers);
	}
}
