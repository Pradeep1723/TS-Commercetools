import { generateCustomerToken, loginUser } from '../helpers/users';
import { redisClient } from '../utils/redisClient';

export const loginUserService = async (email: string, password: string) => {
	try {
		const cachedToken = await redisClient.get(`user_token:${email}`);
		const cachedExpiresIn = await redisClient.ttl(`user_token:${email}`);

		if (cachedToken && cachedExpiresIn > 0) {
			const userProfile = await loginUser(email, password);
			console.log(`Using cached token: ${JSON.stringify(cachedToken)}`);
			console.log(`Cached token expires in: ${cachedExpiresIn}`);
			return {
				message: 'User logged in successfully (cached token)',
				profile: userProfile.body,
				access_token: cachedToken,
				expires_in: cachedExpiresIn
			};
		}

		const userProfile = await loginUser(email, password);

		const { access_token: token, expires_in } = await generateCustomerToken(
			email,
			password
		);
		console.log(`Token expiration (seconds): ${expires_in}`);
		console.log(`Token generated after user login - ${JSON.stringify(token)}`);

		if (token) {
			await redisClient.setex(`user_token:${email}`, expires_in, token);
		} else {
			throw new Error('Failed to generate a new token.');
		}

		return {
			message: 'User logged in successfully',
			profile: userProfile.body,
			access_token: token,
			expires_in
		};
	} catch (error) {
		if ((error as Error).message.includes('401')) {
			return {
				message: 'Session timed out, please log in again'
			};
		}
		throw new Error(`Error while user sign-in: ${JSON.stringify(error)}`);
	}
};
