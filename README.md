# lambda-middleware-utils

Library provides three different types of resources:

1. Middleware functions
2. Http responses
3. Http errors

Both responses and errors resources follow restfull guidelines and http semantics.
Middleware functions allows you to have a cleaner code structure.

## Exposed Middleware functions

1. BodyParser

```typescript
import { ApiProxyMiddleware, BodyParser, Success, IAPIGatewayProxyHandler } from 'lambda-middleware-utils';

interface IBody {}

const proxyHandler: IAPIGatewayProxyHandler<body: IBody> = function(parsedEvent, event) {
	// access parsed body on parsedEvent.body property
	return new Success(parsedEvent.body);
}


export const handler = new ApiProxyMiddleware(proxyHandler)
			.add(new BodyParser())
			.getHandler();
```

This function checks if your proxy event has `Content-Type` or `content-type` header set to `application/json` and if so - parses `event.body` to `parsedEvent.body` property

2. HeadersFixer

```typescript
import { ApiProxyMiddleware, HeadersFixer, Success, IAPIGatewayProxyHandler } from 'lambda-middleware-utils';


const proxyHandler: IAPIGatewayProxyHandler = function(_, event) {
	// all headers will be uppercased: content-type -> Content-Type
	return new Success(event.headers);
}


export const handler = new ApiProxyMiddleware(proxyHandler)
			.add(new HeadersFixer())
			.getHandler();
```

This function evens all event headers to uppercase: content-type -> Content-Type

3. ErrorHandler

```typescript
import { ApiProxyMiddleware, HttpError, Success, IAPIGatewayProxyHandler } from 'lambda-middleware-utils';


const proxyHandler: IAPIGatewayProxyHandler = function(_, event) {
	throw new HttpError();
}


export const handler = new ApiProxyMiddleware(proxyHandler)
			.add(new ErrorHandler())
			.getHandler();
```

This function wraps your lambda and catches all errors, then gives response accordingly

You can create any type of middleware based on exposed abstract class `Ware`, for example you can have `Session` middleware:

```typescript
import { ApiProxyMiddleware, Ware, Unauthorized, ErrorHandler, IAPIGatewayMiddlewareArgs, IAPIGatewayProxyHandler } from 'lambda-middleware-utils';


class Session extends Ware<IAPIGatewayMiddlewareArgs> {
	constructor() {}

	private async validateToken(token: string) {
		/* validate token */
	}

	private async parseToken(token: string) {
		/* return mapped or parsed token */
	}

	async run({ parsedEvent, event }) {
		const token = event.headers['Authorization'];

		if (!token) {
			throw new Unauthorized('Missing access token');
		}

		if (!(await this.validateToken(token))) {
			throw new Unauthorized('Invalid Token');
		}

		parsedEvent.user = await this.parseToken(token);

		return;
	}
}

interface IUser {}

const protectedLambda: IAPIGatewayProxyHandler<{ user: IUser }> = function({ user }, event) {
	/* access user if token was valid */
	return new Success(user);
}

export const handler = new ApiProxyMiddleware(proxyHandler)
			.add(new ErrorHandler())
			.add(new Session())
			.getHandler();
```

## Exposed errors

| Message | Code | Extra | Example |
| ------- | ---- | ----- | ------- |
| 'BadRequest' | 400 | 'ValidationError' | `throw new BadRequest('ValidationError');` |
| 'Conflict' | 409 | 'InvalidStatusChange' | `throw new Conflict('InvalidStatusChange');` |
| 'Forbidden' | 403 | 'User does not have required right' | `throw new BadRequest('User does not have required right');` |
| 'MethodNotAllowed' | 405 | 'MethodNotAllowed' | `throw new MethodNotAllowed('This request method is not allowed');` |
| 'NotFound' | 404 | 'This resource by given id does not exist in the requested table' | `throw new NotFound('This resource by given id does not exist in the requested table');` |
| 'PayloadTooLarge' | 413 | 'Maximum allowed payload size is 400mb' | `throw new PayloadTooLarge('Maximum allowed payload size is 400mb');` |
| 'TooManyRequests' | 429 | 'Maximum amount of requests exceeded, try again in one hour' | `throw new TooManyRequests('Maximum amount of requests exceeded, try again in one hour');` |
| 'Unauthorized' | 401 | 'Missing token' | `throw new Unauthorized('Missing token');` |

## Exposed responses

| Message | Code | Headers | Body | Example |
| ------- | ---- | ------- | ---- | ------- |
| Accepted | 202 | any | any | `return new Accepted(body?, headers?)` |
| Created | 201 | any | no | `return new Created(location?, headers?)` |
| NoContent | 204 | any | no | `return new NoContent(headers?)`
| Success | 200 | any | any | `return new Success(body?, headers?)` |

