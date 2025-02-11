import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
	ClientBuilder,
	AuthMiddlewareOptions,
	HttpMiddlewareOptions,
	PasswordAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { ApiRoot } from '../types/global';
import { readConfig } from './config';
import fetch from 'node-fetch';

const createApiClient = () => {
	const { clientId, clientSecret, host, oauthHost, projectKey } = readConfig();

	const authMiddlewareOptions: AuthMiddlewareOptions = {
		credentials: {
			clientId,
			clientSecret
		},
		host: oauthHost,
		projectKey,
		fetch
	};

	const httpMiddlewareOptions: HttpMiddlewareOptions = {
		host,
		fetch
	};

	const client = new ClientBuilder()
		.withClientCredentialsFlow(authMiddlewareOptions)
		.withHttpMiddleware(httpMiddlewareOptions)
		.build();

	return createApiBuilderFromCtpClient(client, host).withProjectKey({ projectKey });
};

export const createMyApiClient = (username: string, password: string) => {
	const { clientId, clientSecret, host, oauthHost, projectKey } = readConfig();

	const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
		credentials: {
			clientId,
			clientSecret,
			user: {
				username,
				password
			}
		},
		host: oauthHost,
		projectKey,
		fetch
	};

	const httpMiddlewareOptions: HttpMiddlewareOptions = {
		host,
		fetch
	};

	const client = new ClientBuilder()
		.withPasswordFlow(authMiddlewareOptions)
		.withHttpMiddleware(httpMiddlewareOptions)
		.build();

	return createApiBuilderFromCtpClient(client, host).withProjectKey({ projectKey });
};

export const apiRoot: ApiRoot = createApiClient();
