import { useQueryClient } from "@tanstack/react-query";
import { useSyncGetOne } from "data_providers";
import { UserInfo } from "../services/SessionStorage";
import { ProviderNames } from "../types/providers";
import { IDataPayment } from "../components/ConfirmOrder/ConfirmOrderDelivery";

export const useGetPaymentInfo = () => {
  const queryClient = useQueryClient();
  const getClientData = useSyncGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
  const {payment_method_id} = getClientData()

  const data = queryClient.getQueryData<IDataPayment[] >(['payment_methods']);

  const infoPayment = data?.filter((item) => item.payment_method_id === Number(payment_method_id))
  
  return infoPayment ?? [];
}