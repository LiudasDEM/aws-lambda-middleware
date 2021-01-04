import type { S3Event, APIGatewayEvent, Context } from 'aws-lambda';

export function s3Event(options?: Partial<S3Event>): S3Event {
	return {
		Records: [{
			eventVersion: 'test',
			eventSource: 'test',
			awsRegion: 'localhost',
			eventTime: 'test',
			eventName: 'string',
			userIdentity: {
				principalId: 'string',
			},
			requestParameters: {
				sourceIPAddress: 'string',
			},
			responseElements: {
				'x-amz-request-id': 'string',
				'x-amz-id-2': 'string',
			},
			s3: {
				s3SchemaVersion: 'string',
				configurationId: 'string',
				bucket: {
					name: 'string',
					ownerIdentity: {
						principalId: 'string',
					},
					arn: 'string',
				},
				object: {
					key: 'key',
					size: 10,
					eTag: 'random-etag',
					sequencer: 'random-sequencer',
				},
			},
		}],
		...(options || {}),
	}
}


export function apiGatewayEvent(options?: Partial<APIGatewayEvent>): APIGatewayEvent {
	return {
		body: JSON.stringify(null),
		headers: {
			'Content-Type': 'application/json',
		},
		multiValueHeaders: {},
		httpMethod: 'GET',
		isBase64Encoded: false,
		path: '/api/resources',
		pathParameters: {},
		queryStringParameters: {},
		multiValueQueryStringParameters: {},
		stageVariables: {},
		requestContext: {
			accountId: 'accountId',
			apiId: 'apiId',
			authorizer: {},
			protocol: 'http',
			httpMethod: 'GET',
			identity: {
				accessKey: 'S3RVER',
				accountId: 'S3RVER',
				apiKey: 'S3RVER',
				apiKeyId: 'S3RVER',
				caller: 'caller',
				cognitoAuthenticationProvider: null,
				cognitoAuthenticationType: null,
				cognitoIdentityId: null,
				cognitoIdentityPoolId: null,
				principalOrgId: null,
				sourceIp: '0.0.0.0',
				user: null,
				userAgent: null,
				userArn: null,
			},
			path: '/api/resources',
			stage: 'dev',
			requestId: 'requestId',
			requestTimeEpoch: 0,
			resourceId: 'resourceId',
			resourcePath: '/resources',
		},
		resource: 'resource',
		...(options || {}),
	}
}


export function context(options?: Partial<Context>): Context {
	return {
		callbackWaitsForEmptyEventLoop: false,
		functionName: 'test',
		functionVersion: '1',
		invokedFunctionArn: 'arn',
		memoryLimitInMB: '100',
		awsRequestId: 'uuid',
		logGroupName: 'logged',
		logStreamName: 'streamed',
		getRemainingTimeInMillis: () => 1,
		done: () => { },
		fail: () => { },
		succeed: () => { },
		...(options || {}),
	}
}
