import HttpResponse from '../responses/HttpResponse';
import IHeaders from '../interfaces/IHeaders';


export default class Created extends HttpResponse {
	constructor(location?: string, headers?: IHeaders) {
		if (headers) {
			headers = {
				...headers,
				...(location ? { location } : {}),
			}
		} else {
			headers = location ? { location } : undefined;
		}

		super(201, null, headers);
	}
}
