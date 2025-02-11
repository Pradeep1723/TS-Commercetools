import { Request, Response } from 'express';
import { getUserActiveCartService } from '../services/getUserCart.service';

export const getUserActiveCartController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const authToken = req.headers.authorization?.split(' ')[1];

		if (!authToken) {
			res.status(401).json({ message: 'Authorization token is required' });
		}

		const cart = await getUserActiveCartService(authToken!);

		if (!cart) {
			res.status(404).json({ message: 'Cart not found' });
		}

		res.status(200).json(cart);
	} catch (error) {
		console.error(`Error fetching active cart: ${error}`);
		res.status(500).json({
			message: (error as Error).message
		});
	}
};
