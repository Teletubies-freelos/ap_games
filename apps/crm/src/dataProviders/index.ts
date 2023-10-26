import {
  categoriesProvider,
  ordersProvider,
  productsProvider,
} from '../modules';
import { AsyncProviderNames } from '../types/providers';

export const providerNames = {
  [AsyncProviderNames.PRODUCTS]: productsProvider,
  [AsyncProviderNames.ORDERS]: ordersProvider,
  [AsyncProviderNames.CATEGORIES]: categoriesProvider,
};
