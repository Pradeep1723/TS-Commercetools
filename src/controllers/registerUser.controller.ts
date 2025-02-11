import { Request, Response } from 'express';
import validator from 'validator';
import { registerUserInCT } from '../services/registerUser.service';
import { DuplicateUserError, InvalidDataError } from '../errors/CustomError';

export const registerUserController = async (req: Request, res: Response) => {
	const { email, password, firstName, lastName } = req.body;

	if (!email || !password || !firstName || !lastName) {
		res.status(400).json({
			message:
				'Missing required fields: email, password, firstName, and lastName are all required.'
		});
	}

	if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
		if (!res.headersSent) {
			res.status(400).json({
				message: 'First and last names should contain only alphabetic characters.'
			});
		}
		return;
	}

	if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
		if (!res.headersSent) {
			res.status(400).json({
				message:
					'Password must be at least 8 characters long and include at least one uppercase letter and one number.'
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
		await registerUserInCT(email, password, firstName, lastName);

		if (!res.headersSent) {
			res.status(201).json({
				message: 'User registered successfully'
			});
		}
	} catch (error) {
		if (error instanceof DuplicateUserError) {
			res.status(409).json({
				message: 'Email already exists. Please choose a different email.'
			});
		}

		if (error instanceof InvalidDataError) {
			res.status(400).json({
				message: 'Provided data is invalid.'
			});
		}

		if (!res.headersSent) {
			res.status(500).json({
				message: 'An error occurred while registering the user.'
			});
		}
	}
};
