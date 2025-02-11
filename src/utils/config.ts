import { config } from 'dotenv';

config();

type Config = {
	clientId: string;
	clientSecret: string;
	projectKey: string;
	oauthHost: string;
	host: string;
	username?: string;
	password?: string;
	storeKey?: string;
};

export const readConfig = (): Config => {
	return {
		clientId: process.env['CTP_CLIENT_ID'] || '',
		clientSecret: process.env['CTP_CLIENT_SECRET'] || '',
		projectKey: process.env['CTP_PROJECT_KEY'] || '',
		oauthHost: process.env['CTP_AUTH_URL'] || '',
		host: process.env['CTP_API_URL'] || ''
	};
};
