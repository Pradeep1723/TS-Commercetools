import { Request, Response } from 'express';
import { verifyUserEmail } from '../helpers/users';

export const verifyEmailController = async (req: Request, res: Response) => {
	const { token } = req.query;

	if (!token) {
		res.status(400).json({ message: 'Missing verification token.' });
	}

	try {
		const emailVerifiedResponse = await verifyUserEmail(token as string);

		if (emailVerifiedResponse && emailVerifiedResponse.isEmailVerified) {
			res.status(200).json({ message: 'Email verified successfully.' });
		} else {
			res.status(400).json({ message: 'Email verification failed.' });
		}
	} catch (error) {
		res.status(500).json({ message: `Error verifying email: ${error}` });
	}
};
