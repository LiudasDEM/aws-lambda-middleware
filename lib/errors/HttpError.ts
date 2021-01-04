import HttpResponse from '../responses/HttpResponse';
import IHttpResponseParts from '../interfaces/IHttpResponseParts';


export default class HttpError extends Error {
	private _statusCode: number;
	private _body: string;

	static buildError(error: Error | HttpError): HttpResponse {
		if (error instanceof HttpError) {
			return new HttpResponse(error.statusCode, error.body);
		}
		return new HttpResponse(500, { message: error.message, stack: error.stack });
	}

	constructor(statusCode = 500, message = 'InternalServerError', extra?: unknown) {
		super(message);
		this._statusCode = statusCode;
		this._body = JSON.stringify({ message, extra });
	}

	public get statusCode(): number {
		return this._statusCode;
	}

	public get body(): string {
		return this._body;
	}

	getResponse(): IHttpResponseParts {
		return {
			statusCode: this._statusCode,
			body: this._body,
			headers: HttpResponse.defaultHeaders,
		};
	}
}
