import { PropsWithChildren, createContext } from 'react';
import { type Products } from '../../services/products';
import { type Orders } from '../../services/orders';
import { type Categories } from '../../services/categories';

export const dataContext = createContext<Partial<DataProviderProps>>({});

interface DataProviderProps {
  products: Products;
  orders: Orders;
  categories: Categories;
}

export const DataProvider = ({
  children,
  ...rest
}: PropsWithChildren<DataProviderProps>) => {
  return <dataContext.Provider value={rest}>{children}</dataContext.Provider>;
};
