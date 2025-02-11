import {
	ClientResponse,
	Customer,
	CustomerSignInResult,
	CustomerToken
} from '@commercetools/platform-sdk';
import { apiRoot, createMyApiClient } from '../utils/client';
import axios from 'axios';
import { readConfig } from '../utils/config';
import { redisClient } from '../utils/redisClient';

const { clientId, clientSecret, oauthHost, projectKey } = readConfig();

export const signUpUser = async (
	userEmail: string,
	userPassword: string,
	userFirstName: string,
	userLastName: string
): Promise<ClientResponse<CustomerSignInResult>> => {
	try {
		return apiRoot
			.me()
			.signup()
			.post({
				body: {
					email: userEmail,
					password: userPassword,
					firstName: userFirstName,
					lastName: userLastName
				}
			})
			.execute();
	} catch (error) {
		throw new Error(`Error registering user: ${JSON.stringify(error)}`);
	}
};

export const loginUser = async (
	userEmail: string,
	userPassword: string
): Promise<ClientResponse<CustomerSignInResult>> => {
	try {
		const myApiRoot = createMyApiClient(userEmail, userPassword);

		return myApiRoot
			.me()
			.login()
			.post({
				body: {
					email: userEmail,
					password: userPassword
				}
			})
			.execute();
	} catch (error) {
		throw new Error(`Error logging in: ${JSON.stringify(error)}`);
	}
};

export const changeUserPassword = async (
	currentPassword: string,
	newPassword: string,
	version: number
): Promise<ClientResponse<Customer>> => {
	try {
		return apiRoot
			.me()
			.password()
			.post({
				body: {
					currentPassword,
					newPassword,
					version
				}
			})
			.execute();
	} catch (error) {
		throw new Error(`Error while changing user password: ${JSON.stringify(error)}`);
	}
};

export const resetUserPassword = async (
	token: string,
	newPassword: string
): Promise<ClientResponse<Customer>> => {
	try {
		return apiRoot
			.me()
			.password()
			.reset()
			.post({
				body: {
					tokenValue: token,
					newPassword
				}
			})
			.execute();
	} catch (error) {
		throw new Error(`Error while resetting user password: ${JSON.stringify(error)}`);
	}
};

export const generateCustomerToken = async (
	email: string,
	password: string
): Promise<{ access_token: string; expires_in: number }> => {
	try {
		const response = await axios.post(
			`${oauthHost}/oauth/${projectKey}/customers/token`,
			new URLSearchParams({
				grant_type: 'password',
				username: email,
				password: password
			}),
			{
				auth: {
					username: clientId,
					password: clientSecret
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		);

		const { access_token, expires_in } = response.data;

		await redisClient.set(email, access_token, 'EX', expires_in);

		return {
			access_token: response.data.access_token,
			expires_in: response.data.expires_in
		};
	} catch (error) {
		throw new Error(`Error while getting the auth token for customer: ${error}`);
	}
};

export const logoutUser = async (email: string, token: string) => {
	try {
		await axios.post(
			`${oauthHost}/oauth/token/revoke`,
			new URLSearchParams({
				token,
				token_type_hint: 'access_token' // or 'refresh_token' if revoking it
			}),
			{
				auth: {
					username: clientId,
					password: clientSecret
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		);

		await redisClient.del(email);

		return { message: 'User logged out successfully' };
	} catch (error) {
		throw new Error(`Error logging out: ${JSON.stringify(error)}`);
	}
};

export const createUserEmailToken = async (
	userId: string,
	expiryInMinutes: number
): Promise<CustomerToken> => {
	try {
		const emailTokenResponse = await apiRoot
			.customers()
			.emailToken()
			.post({
				body: {
					id: userId,
					ttlMinutes: expiryInMinutes
				}
			})
			.execute();

		return emailTokenResponse.body;
	} catch (error) {
		throw new Error(`Error sending email token: ${JSON.stringify(error)}`);
	}
};

export const verifyUserEmail = async (emailToken: string): Promise<Customer> => {
	try {
		const emailVerifiedResponse = await apiRoot
			.customers()
			.emailConfirm()
			.post({
				body: {
					tokenValue: emailToken
				}
			})
			.execute();

		return emailVerifiedResponse.body;
	} catch (error) {
		throw new Error(`Error verifying user email: ${JSON.stringify(error)}`);
	}
};

// Saving this for later if needed anywhere else.
// Same response as login.
export const loadUserAccount = async (
	username: string,
	password: string
): Promise<ClientResponse<Customer>> => {
	try {
		const myApiRoot = createMyApiClient(username, password);
		const userInfo = await myApiRoot.me().get().execute();

		return userInfo;
	} catch (error) {
		throw new Error(`Unable to get user profile: ${JSON.stringify(error)}`);
	}
};
