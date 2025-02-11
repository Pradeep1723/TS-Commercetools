import { performOperationsWithGraphQL } from '../helpers/getDataWithGraphQL.ts';

export const fetchAllProducts = async (): Promise<void> => {
	try {
		let limit = 500,
			lastPage = false,
			lastId = null,
			where = null;

		while (!lastPage) {
			where = lastId ? `"id > \\"${lastId}\\""` : null;

			const query = `query GetAllProducts {
                    products(where: ${where}, limit: ${limit}, sort: "id asc") {
                        results {
                            id
                            key
                        }
                    }
                }`;

			const productsResult = await performOperationsWithGraphQL(query);
			const products = productsResult.body.data?.products?.results;

			for (const product of products) {
				console.log(`Fetched product with ID: ${product.id}`);
			}

			if (products.length < limit) {
				lastPage = true;
			}
		}

		console.log(`Fetched all products from CT.`);
	} catch (error) {
		throw new Error(`Couldn't get all the products: ${JSON.stringify(error)}`);
	}
};
