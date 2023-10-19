import { GraphQLClient } from 'graphql-request';
import { Products } from '../services/Products';
import { graphqlURL, masterToken } from '../config/hasura';
import { Cart } from '../services/Cart';
import { appGamesDbSingleton } from '../data/indexedDB';
import { Featured } from '../services/Featured';
import { Categories } from '../services/Cateogries';
import { SessionClientStorage } from '../services/SessionStorage';
import { Orders } from '../services/Orders';
import { OrdersProducts } from '../services/OrdersProducts';
import { PaymentMethods } from '../services/PaymentMethods';

const headers = new Headers({
  'x-hasura-admin-secret': masterToken,
});

export const graphqlClient = new GraphQLClient(graphqlURL, {
  headers,
});

export const productsProvider = new Products(graphqlClient);

export const cartProvider = new Cart(appGamesDbSingleton.products);

export const featuredProvider = new Featured(graphqlClient);

export const categoriesProvider = new Categories(graphqlClient);

export const sessionStorageProvider = new SessionClientStorage();

export const ordersProvider = new Orders(graphqlClient);

export const ordersProductsProvider = new OrdersProducts(graphqlClient);

export const paymentMethodsProvider = new PaymentMethods(graphqlClient);
