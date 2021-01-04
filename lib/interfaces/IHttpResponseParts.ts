import IHeaders from '../interfaces/IHeaders';


export default interface IHttpResponseParts {
	statusCode: number;
	headers: IHeaders;
	body: string;
}
