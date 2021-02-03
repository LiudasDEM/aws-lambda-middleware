import IHeaders from '../interfaces/IHeaders';
import IHttpResponseParts from '../interfaces/IHttpResponseParts';

import HeadersFixer from '../proxy/HeadersFixer';

export default class HttpResponse {
	private _statusCode: number;
	private _body: string;
	private _headers: { [key: string]: string };

	static defaultHeaders: IHeaders = {
		'Content-Type': 'application/json',
	};

	static buildResponse(res: HttpResponse | IHttpResponseParts): IHttpResponseParts {
		if (res instanceof HttpResponse) {
			return res.getResponse();
		}
		return res;
	}

	constructor(statusCode = 200, body: unknown = undefined, headers = HttpResponse.defaultHeaders) {
		this._statusCode = statusCode;
		this._body = typeof body === 'string' ? body : JSON.stringify(body);
		this._headers = headers;
	}

	public get statusCode(): number {
		return this._statusCode;
	}

	public get body(): string {
		return this._body;
	}

	public get headers(): IHeaders {
		return this._headers;
	}

	getResponse(): IHttpResponseParts {
		return {
			statusCode: this._statusCode,
			body: this._body,
			headers: Object
				.entries(this._headers)
				.reduce((acc, [k, v]) => ({
					...acc,
					[HeadersFixer.uppercaseHeader(k)]: v,
				}), {}),
		};
	}
}
