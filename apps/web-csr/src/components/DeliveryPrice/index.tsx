import { useSyncGetOne } from "data_providers";
import { LabelStepStatus } from "../../../../../packages/ui/src";
import { SyncProviderNames } from "../../types/providers";

export const DeliveryPriceLocal = () => {
  const syncGetPriceDelivery = useSyncGetOne(SyncProviderNames.LOCAL_CONFIG)
  const { deliveryPrice } = syncGetPriceDelivery()

  return (<LabelStepStatus
      property='Costo de delivery'
      value={`S/. ${deliveryPrice}`}
      sx={{
        fontSize: '1rem !important',
        marginTop: '1.5rem',
      }}
    />
  )
}
