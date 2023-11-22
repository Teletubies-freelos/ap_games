import { GraphQLClient } from 'graphql-request';
import { env } from '../config';
import { Categories } from '../services/categories/index';
import { ProductsData } from '../services/Products';
import { OrdersData } from '../services/Orders';
import { CategoriesData } from '../services/Categories';
import { Products } from '../services/products/index';
import { Orders } from '../services/orders/index';
import { OrdersStatusesData } from '../services/OrderStatuses';
import { FeaturedProductsData } from '../services/FeaturedProducts';
import { DeliveryCostsData } from '../services/DeliveryCosts';
import { GeolocationData } from '../services/Geolocation';

export const graphqlClient = new GraphQLClient(env.HASURA_GRAPHQL_URL);
if (env.HASURA_GRAPHQL_MASTER_TOKEN) {
  graphqlClient.setHeader(
    'x-hasura-admin-secret',
    env.HASURA_GRAPHQL_MASTER_TOKEN
  );
}
export const productsClient = new Products(graphqlClient);

export const ordersClient = new Orders(graphqlClient);

export const categoriesClient = new Categories(graphqlClient);

export const productsProvider = new ProductsData(graphqlClient);

export const ordersProvider = new OrdersData(graphqlClient);

export const ordersStatusesProvider = new OrdersStatusesData(graphqlClient);

export const featuredProvider = new FeaturedProductsData(graphqlClient);

export const deliveryCostsProvider = new DeliveryCostsData(graphqlClient);
export const geolocationProvider = new GeolocationData(graphqlClient);

export const categoriesProvider = new CategoriesData(graphqlClient);
