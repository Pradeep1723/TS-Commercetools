import { Request, Response } from 'express';
import { fetchAllProducts } from '../services/getProducts.service.ts';

export const fetchAllProductsController = async (_req: Request, res: Response) => {
	try {
		const products = await fetchAllProducts();
		res.status(200).json({
			success: true,
			message: 'Fetched all products from CT.',
			products
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to fetch products'
		});
		throw new Error(
			`Error while calling the get products controller: ${JSON.stringify(error)}`
		);
	}
};
