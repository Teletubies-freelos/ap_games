import { useGetList } from "data_providers"
import { ProviderNames } from "../types/providers"

export default function Home(){
  const getProducts = useGetList(ProviderNames.PRODUCTS)
  console.log(getProducts())

  return (
    <div>
      Hola mundo
    </div>
  )
}
