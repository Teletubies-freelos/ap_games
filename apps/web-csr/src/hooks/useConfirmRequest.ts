import {
  useCreateMany,
  useCreateOne,
  useGetList,
  useGetOne,
} from 'data_providers';
import { ProviderNames } from '../types/providers';
import { UserInfo } from '../services/SessionStorage';
import { PaymentMethodData } from '../components/PaymentMethodModal/PaymentMethodBody';
import { getWhatsappMessage, getWhatsappNumber } from '../utils/wspInfoBuilder';
import { useChannel } from "ably/react";

export interface IProduct {
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

  const { channel } = useChannel("orders");

  return async (data: PaymentMethodData) => {
    const clientData = await getClientData();
    const products  = await getCartProducts();
    const wsp_value = getWhatsappNumber(clientData.phone);
    const wsp_message = getWhatsappMessage(clientData, products);
    
    const { order_id } = (await createOrder({
      ...clientData,
      ...data,
      wsp_value,
      wsp_message
    })) ?? {};

    channel.publish("orders", { created_at : new Date() });
    const reducedProducts = groupProductQuantity(products);

    await createOrderProducts(
      reducedProducts.map(({ productId, quantity }) => ({
        product_id: productId,
        order_id,
        quantity,
      }))
    );

    return order_id;
  };
};

function groupProductQuantity(products: IProduct[]) {
  const quantityById = products.reduce((acc: any, product: IProduct) => {
    const { productId, quantity, price } = product;

    if (acc.hasOwnProperty(productId)) {
      acc[productId].quantity += quantity;
      acc[productId].price += price;
    } else {
      acc[productId] = { ...product };
    }

    return acc;
  }, {});

  return Object.values<IProduct>(quantityById);
}