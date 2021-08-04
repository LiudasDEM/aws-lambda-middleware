import HttpRes from '../lib/responses/HttpResponse';

export class HttpResponse extends HttpRes {
	static restoreDefaultHeaders(): void {
		HttpRes.defaultHeaders = {
			'Content-Type': 'application/json',
		};
	}

	static restoreDefaultMandatoryHeaders(): void {
		HttpRes.mandatoryHeaders = {};
	}
}
