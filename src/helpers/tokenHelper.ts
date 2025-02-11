import { redisClient } from '../utils/redisClient';

export const verifyToken = async (token: string) => {
	try {
		const userId = await redisClient.get(token);

		if (userId) {
			return { isValid: true, userId };
		} else {
			return { isValid: false };
		}
	} catch (error) {
		throw new Error(`Failed to verify token: ${error}`);
	}
};
