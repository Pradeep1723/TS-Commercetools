import { Request, Response } from 'express';
import { createUserCartService } from '../services/createUserCart.service';

export const createUserCartController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const authToken = req.headers.authorization?.split(' ')[1];

		if (!authToken) {
			res.status(401).json({ message: 'Authorization token is required' });
		}

		const createdCart = await createUserCartService(authToken!);

		res.status(201).json(createdCart);
	} catch (error) {
		res.status(500).json({
			message: 'Error creating user cart'
		});
	}
};
