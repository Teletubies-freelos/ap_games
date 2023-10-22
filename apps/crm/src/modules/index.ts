import { GraphQLClient } from 'graphql-request';
import { env } from '../config';
import { Products } from '../services/products';
import { Orders } from '../services/orders';
import { Categories } from '../services/categories';

export const graphqlClient = new GraphQLClient(env.HASURA_GRAPHQL_URL);
if (env.HASURA_GRAPHQL_MASTER_TOKEN) {
  graphqlClient.setHeader(
    'x-hasura-admin-secret',
    env.HASURA_GRAPHQL_MASTER_TOKEN,
  );
}
export const productsClient = new Products(graphqlClient);

export const ordersClient = new Orders(graphqlClient);

export const categoriesClient = new Categories(graphqlClient);
