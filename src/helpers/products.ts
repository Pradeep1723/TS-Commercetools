import {
	ClientResponse,
	Product,
	ProductUpdate,
	ProductProjection,
	ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import { apiRoot } from '../utils/client.ts';

export const getAllProductsFromCT = async (): Promise<
	ClientResponse<ProductProjectionPagedQueryResponse>
> => {
	try {
		return await apiRoot.productProjections().get().execute();
	} catch (error) {
		throw new Error(`Failed to fetch products: ${JSON.stringify(error)}`);
	}
};

export const getProductById = async (
	productId: string
): Promise<ClientResponse<ProductProjection>> => {
	try {
		return await apiRoot
			.productProjections()
			.withId({ ID: productId })
			.get()
			.execute();
	} catch (error) {
		throw new Error(`Error getting the product by ID: ${JSON.stringify(error)}`);
	}
};

export const getProductByKey = async (
	productKey: string
): Promise<ClientResponse<ProductProjection>> => {
	try {
		return await apiRoot
			.productProjections()
			.withKey({ key: productKey })
			.get()
			.execute();
	} catch (error) {
		throw new Error(`Error getting the product by Key: ${JSON.stringify(error)}`);
	}
};

export const updateProductById = async (
	productId: string,
	updateProductBody: ProductUpdate
): Promise<ClientResponse<Product>> => {
	try {
		return await apiRoot
			.products()
			.withId({ ID: productId })
			.post({
				body: updateProductBody
			})
			.execute();
	} catch (error) {
		throw new Error(`Error updating product by ID: ${JSON.stringify(error)}`);
	}
};

export const deleteProductById = async (
	productId: string,
	productVersion: number
): Promise<ClientResponse<Product>> => {
	try {
		return await apiRoot
			.products()
			.withId({ ID: productId })
			.delete({
				queryArgs: {
					version: productVersion
				}
			})
			.execute();
	} catch (error) {
		throw new Error(`Error deleting the product by ID: ${JSON.stringify(error)}`);
	}
};

export const deleteProductByKey = async (
	productKey: string,
	productVersion: number
): Promise<ClientResponse<Product>> => {
	try {
		return await apiRoot
			.products()
			.withKey({ key: productKey })
			.delete({
				queryArgs: {
					version: productVersion
				}
			})
			.execute();
	} catch (error) {
		throw new Error(`Error deleting product by Key: ${JSON.stringify(error)}`);
	}
};
