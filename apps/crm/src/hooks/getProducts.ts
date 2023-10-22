import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { dataContext } from "../context/data"
import { MRT_PaginationState } from "material-react-table"


export const useGetProducts = ()=>{
  const { products } = useContext(dataContext)
  const [ page, setPage ] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20
  })

  const queryData = useQuery(['products', page], {
    queryFn: ()=> products?.getList({pagination:{offset: page.pageIndex*page.pageSize}})
  })

  return {
    ...queryData,
    setPage,
    pagination: page
  }

}
