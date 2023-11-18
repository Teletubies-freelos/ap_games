import { LabelStepStatus } from "../../../../../packages/ui/src";

export const DeliveryPriceLocal = ({ deliveryPrice }: { deliveryPrice: number | undefined }) => {
  // const syncGetPriceDelivery = useSyncGetOne(SyncProviderNames.LOCAL_CONFIG)
  // const { deliveryPrice } = syncGetPriceDelivery()
  // const queryClient = useQueryClient()
  // queryClient.getQueryData(['config'])

  // // const product: Maybe<CardProductProps> = useMemo(
  // //   () => {
  // //     const result = query?.pages.flat().map(serializeGames)?.find((product: CardProductProps) => product.productId == productId)
  // //     if (!result) {
  // //       return productById;
  // //     }
  // //     return result;
  // //   },
  // //   [productId, query?.pages, productById]
  // // );

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
