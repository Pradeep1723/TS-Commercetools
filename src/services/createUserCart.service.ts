import { Cart } from '@commercetools/platform-sdk';
import { createMyCart } from '../helpers/carts';

export const createUserCartService = async (authToken: string): Promise<Cart> => {
	try {
		const createdCart = await createMyCart(authToken);

		return createdCart;
	} catch (error) {
		throw new Error(`Error creating user cart: ${JSON.stringify(error)}`);
	}
};
