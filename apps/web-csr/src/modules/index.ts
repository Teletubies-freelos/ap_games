import { GraphQLClient } from 'graphql-request';
import { Products } from '../services/Products';
import { graphqlURL, masterToken } from '../config/hasura';
import { Cart } from '../services/Cart';
import { appGamesDbSingleton } from '../data/indexedDB';

const headers = new Headers({
  'x-hasura-admin-secret': masterToken,
});

export const graphqlClient = new GraphQLClient(graphqlURL, {
  headers,
});

export const productsProvider = new Products(graphqlClient);

export const cartProvider = new Cart(appGamesDbSingleton.products);
