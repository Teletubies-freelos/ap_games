import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetList, useSyncGetOne } from "data_providers";
import { UserInfo } from "../services/SessionStorage";
import { ProviderNames } from "../types/providers";
import { IDataPayment } from "../components/ConfirmOrder/ConfirmOrderDelivery";

export const useGetPaymentInfo = () => {
  const queryClient = useQueryClient();
  const getClientData = useSyncGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
  const { payment_method_id } = getClientData()

  const getPaymentMethods = useGetList<IDataPayment[]>(ProviderNames.PAYMENT_METHODS);
  const { data } = useQuery(
    ['payment_methods'],
    async () => await getPaymentMethods()
  );
    // @ts-ignore
  const infoPayment = data?.filter((item: IDataPayment) => item.payment_method_id == Number(payment_method_id))

  return infoPayment ?? [];
}