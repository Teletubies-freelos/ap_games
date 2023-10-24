import {
  useCreateMany,
  useCreateOne,
  useGetList,
  useGetOne,
} from 'data_providers';
import { ProviderNames } from '../types/providers';
import { UserInfo } from '../services/SessionStorage';
import { PaymentMethodData } from '../components/PaymentMethodModal/PaymentMethodBody';

interface IProduct {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  priceDiscount: number;
  productId: number;
  quantity: number;
}

export const useConfirmRequest = () => {
  const getClientData = useGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
  const getCartProducts = useGetList<IProduct>(ProviderNames.CART);
  const createOrder = useCreateOne(ProviderNames.ORDERS);
  const createOrderProducts = useCreateMany(ProviderNames.ORDER_PRODUCTS);

  return async (data: PaymentMethodData) => {
    const clientData = await getClientData();
    const products = await getCartProducts();

    const { order_id } =
      (await createOrder({
        ...clientData,
        ...data,
      })) ?? {};

    await createOrderProducts(
      products.map(({ productId, quantity }) => ({
        product_id: productId,
        order_id,
        quantity,
      }))
    );

    return order_id;
  };
};
