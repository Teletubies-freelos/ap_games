import { useCallback, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { setIsCartOpen } from "../../observables";
import { CartIcon } from "../../../../../packages/ui/src";
import { useGetList } from "data_providers";
import { ProviderNames } from "../../types/providers";

export const CartIconReactive = () => {
  const getCartList = useGetList(ProviderNames.CART)
  const productsCount = useLiveQuery(async ()=> (await getCartList()).length)
  const isOpenRef = useRef<boolean | undefined>(false)

  const handleOnClick = useCallback(()=>{
    setIsCartOpen(!isOpenRef.current)
    isOpenRef.current = !isOpenRef.current
  },[])

  return(
    <CartIcon onClick={handleOnClick} qty={productsCount} size="medium" />
  )
}

