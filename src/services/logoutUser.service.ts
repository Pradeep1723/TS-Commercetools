import { logoutUser } from '../helpers/users';

export const logoutUserService = async (email: string, token: string | undefined) => {
	if (!token) {
		throw new Error('Token is required for logout');
	}

	try {
		await logoutUser(email, token);

		return { message: 'User logged out successfully' };
	} catch (error) {
		throw new Error(`Error in logout service: ${error}`);
	}
};
