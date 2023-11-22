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
import { GeolocationProvider } from '../services/Geolocation';
import { ConfigCms } from '../services/ConfigCms';
import { LocalConfig } from '../services/LocalConfig';
import { SyncSessionClientStorage } from '../services/SyncSessionStorage';
import { OrderStatus } from '../services/OrderStatus';
import { DeliveryWays } from '../services/DeliveryWays';
import { Config } from '../services/Config';
import { DeliveryCostsData } from '../services/DeliveryCosts';


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

export const geolocationProvider = new GeolocationProvider("1501");

export const configCmsProvider = new ConfigCms(graphqlClient);

export const localConfigProvider = new LocalConfig();

export const syncSessionStorageProvider = new SyncSessionClientStorage()

export const orderStatusProvider = new OrderStatus(graphqlClient);

export const deliveryWaysProvider = new DeliveryWays(graphqlClient);
export const deliveryCostsProvider = new DeliveryCostsData(graphqlClient);

export const configProvider = new Config(graphqlClient);