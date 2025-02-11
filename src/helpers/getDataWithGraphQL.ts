import { ClientResponse, GraphQLResponse } from '@commercetools/platform-sdk';
import { apiRoot } from '../utils/client.ts';

export const performOperationsWithGraphQL = async (
	query: string
): Promise<ClientResponse<GraphQLResponse>> => {
	try {
		return await apiRoot
			.graphql()
			.post({
				body: {
					query
				}
			})
			.execute();
	} catch (error) {
		throw new Error(
			`Error while performing operations with GraphQL: ${JSON.stringify(error)}`
		);
	}
};
