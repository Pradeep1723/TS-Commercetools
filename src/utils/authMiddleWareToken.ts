import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/tokenHelper';

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers['authorization']?.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Authorization token is required' });
		}

		const { isValid, userId } = await verifyToken(token);

		if (isValid) {
			req.userId = userId;
			next();
		} else {
			return res.status(401).json({ message: 'Invalid or expired token' });
		}
	} catch (error) {
		throw new Error(`Error while authorizing user: ${error}`);
	}
};
