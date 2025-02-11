import { Cart } from '@commercetools/platform-sdk';
import { getMyActiveCart } from '../helpers/carts';

export const getUserActiveCartService = async (
	authToken: string
): Promise<Cart | undefined> => {
	try {
		const cart = await getMyActiveCart(authToken);

		return cart;
	} catch (error) {
		console.error(`Error fetching active cart: ${error}`);
	}
};
