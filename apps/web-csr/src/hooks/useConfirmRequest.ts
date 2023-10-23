import { useCreateMany, useCreateOne, useGetList, useGetOne } from "data_providers";
import { ProviderNames } from "../types/providers";
import { UserInfo } from "../services/SessionStorage";
import { PaymentMethodData } from "../components/PaymentMethodModal/PaymentMethodBody";

export const useConfirmRequest = () => {
  const getClientData = useGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
  const getCartProducts = useGetList(ProviderNames.CART);
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
      products.map(({ productId }) => ({
        product_id: productId,
        order_id,
      }))
    );

    return order_id
  };
};