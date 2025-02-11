import { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';
import axios from 'axios';
import { readConfig } from '../utils/config';
const CURRENCY = process.env.CART_CURRENCY;
const apiUrl = readConfig().host;
const projectKey = readConfig().projectKey;

export const getMyActiveCart = async (authToken: string): Promise<Cart> => {
	try {
		const cartResponse = await axios.get(`${apiUrl}/${projectKey}/me/active-cart`, {
			headers: {
				Authorization: `Bearer ${authToken}`
			}
		});

		return cartResponse.data as Cart;
	} catch (error) {
		throw new Error(`Error getting user cart: ${JSON.stringify(error)}`);
	}
};

export const createMyCart = async (authToken: string): Promise<Cart> => {
	try {
		const createdCartResponse = await axios.post(
			`${apiUrl}/${projectKey}/me/carts`,
			{
				currency: CURRENCY
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json'
				}
			}
		);

		return createdCartResponse.data as Cart;
	} catch (error) {
		throw new Error(`Error creating user cart: ${JSON.stringify(error)}`);
	}
};

export const addItemToMyCart = async (
	cartId: string,
	updateActions: MyCartUpdateAction[],
	cartVersion: number,
	authToken: string
): Promise<Cart> => {
	try {
		const updateResponse = await axios.post(
			`${apiUrl}/${projectKey}/me/carts/${cartId}`,
			{
				version: cartVersion,
				actions: updateActions
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json'
				}
			}
		);

		return updateResponse.data as Cart;
	} catch (error) {
		throw new Error(`Error updating user cart: ${JSON.stringify(error)}`);
	}
};

export const deleteMyCart = async (
	authToken: string,
	cartId: string,
	cartVersion: number
) => {
	try {
		await axios.delete(`${apiUrl}/${projectKey}/me/carts/${cartId}`, {
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json'
			},
			params: {
				version: cartVersion
			}
		});
	} catch (error) {
		throw new Error(`Error deleting user cart: ${JSON.stringify(error)}`);
	}
};

export const addLineItemToCart = async (
	authToken: string,
	cartId: string,
) => {
	try {
		await axios.post(`${apiUrl}/${projectKey}/me/carts/${cartId}`, {

		})
	} catch (error) {
		throw new Error(`Unable to add item to the cart: ${JSON.stringify(error)}`)
	}
};
