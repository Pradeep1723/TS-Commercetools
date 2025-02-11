import {
	signUpUser,
	generateCustomerToken,
	createUserEmailToken
} from '../helpers/users';
import { redisClient } from '../utils/redisClient';
import { sendVerificationEmail } from './verifyEmail.service';
const EMAIL_CONFIRM_EXPIRY_MINUTES = process.env.EMAIL_CONFIRM_EXPIRY_MINUTES;

export const registerUserInCT = async (
	email: string,
	password: string,
	firstName: string,
	lastName: string
) => {
	try {
		const signedUpUserData = await signUpUser(email, password, firstName, lastName);
		const { access_token: token, expires_in } = await generateCustomerToken(
			email,
			password
		);

		if (!token) throw new Error('Failed to generate token after user registeration.');

		const userId = signedUpUserData.body.customer.id;
		const emailTokenResponse = await createUserEmailToken(
			userId,
			parseInt(EMAIL_CONFIRM_EXPIRY_MINUTES!, 10)
		);

		await redisClient.setex(`user_token:${email}`, expires_in, token);

		sendVerificationEmail(email, emailTokenResponse.value);

		console.log(`User registration and token generation successful for ${email}`);
		return { message: 'Registration successful. Please verify your email.' };
	} catch (error) {
		throw new Error(`Error while registering user in CT: ${JSON.stringify(error)}`);
	}
};
