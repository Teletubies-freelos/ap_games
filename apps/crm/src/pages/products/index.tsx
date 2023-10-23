import { Authenticated } from "../../components/authenticated";
import { ListProducts } from "./ListProducts";


export default function ProductsListPage(){
  return(
    <Authenticated>
      <ListProducts />
    </Authenticated>
  )
}
