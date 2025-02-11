import { Request, Response } from 'express';
import validator from 'validator';
import { loginUserService } from '../services/loginUser.service';
import { redisClient } from '../utils/redisClient';

export const loginUserController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		if (!res.headersSent) {
			res.status(400).json({
				message: 'Missing required fields: email and password are required.'
			});
		}
		return;
	}

	if (!validator.isEmail(email)) {
		if (!res.headersSent) {
			res.status(400).json({
				message: 'Invalid email format. Please provide a valid email address.'
			});
		}
		return;
	}

	try {
		const { message, profile, access_token, expires_in } = await loginUserService(
			email,
			password
		);
		const userId = profile?.customer.id;

		if (access_token && userId && expires_in) {
			await redisClient.set(access_token, userId, 'EX', expires_in);
			console.log(`User with ID: ${userId} logged in successfully.`);
		} else {
			if (!res.headersSent) {
				res.status(500).json({ message: 'Failed to generate access token.' });
			}
			return;
		}

		if (!res.headersSent) {
			res.status(200).json({
				message,
				profile,
				access_token,
				expires_in
			});
		}
	} catch (error) {
		if (!res.headersSent) {
			res.status(400).json({
				message: 'Invalid email or password.'
			});
		}
	}
};
