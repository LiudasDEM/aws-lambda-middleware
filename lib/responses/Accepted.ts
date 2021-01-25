import HttpResponse from '../responses/HttpResponse';

import IHeaders from '../interfaces/IHeaders';


export default class Accepted extends HttpResponse {
	constructor(headers?: IHeaders) {
		super(202, undefined, headers);
	}
}
