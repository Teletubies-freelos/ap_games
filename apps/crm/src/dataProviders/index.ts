import {
  categoriesProvider,
  ordersProvider,
  ordersStatusesProvider,
  productsProvider,
  featuredProvider,
  deliveryCostsProvider,
  geolocationProvider,
} from '../modules';
import { AsyncProviderNames } from '../types/providers';

export const providerNames = {
  [AsyncProviderNames.PRODUCTS]: productsProvider,
  [AsyncProviderNames.ORDERS]: ordersProvider,
  [AsyncProviderNames.CATEGORIES]: categoriesProvider,
  [AsyncProviderNames.ORDERS_STATUSES]: ordersStatusesProvider,
  [AsyncProviderNames.FEATURED]: featuredProvider,
  [AsyncProviderNames.DELIVERY_COSTS]: deliveryCostsProvider,
  [AsyncProviderNames.GEOLOCATION]: geolocationProvider,
};