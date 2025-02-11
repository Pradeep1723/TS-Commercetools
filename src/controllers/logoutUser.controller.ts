import { Request, Response } from 'express';
import { logoutUserService } from '../services/logoutUser.service';

export const logoutUserController = async (req: Request, res: Response) => {
	const token = req.headers.authorization?.split(' ')[1];
	const email = req.body.email;

	if (!token || !email) {
		res.status(400).json({ message: 'Token and email are required for logout.' });
	}

	try {
		const response = await logoutUserService(email, token);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({
			message: `Error logging out: ${error}`
		});
	}
};
