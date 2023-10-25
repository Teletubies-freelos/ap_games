import { PropsWithChildren, useEffect } from "react"
import { ProviderNames, SyncProviderNames } from "../types/providers";
import { useGetList, useSyncCreateOne, useSyncGetOne } from "data_providers";
import { useQuery } from "@tanstack/react-query";
import { IConfig } from "../services/LocalConfig";
import dayjs from "dayjs";
import { LoadingPage } from "../../../../packages/ui/src";

interface IConfigCms {
  config_id: number;
  value: number;
  name: string;
  meta?: string;
}

const serializeConfig = ({name, value}: IConfigCms)=> ( { [name]: value })
const transformConfig = (data: IConfigCms[] = []) => data.reduce((acc, item)=> ({...acc, ...serializeConfig(item)}), {})

export const  Initializer = ({children}:PropsWithChildren)=>{
  const getOrderStatus = useGetList(ProviderNames.ORDER_STATUS)
  const getConfig = useGetList(ProviderNames.CONFIG_CMS);
  const getConfigLocal = useSyncGetOne(SyncProviderNames.LOCAL_CONFIG)
  const createCache = useSyncCreateOne(SyncProviderNames.LOCAL_CONFIG)
  const {cacheTime = '7', createdAt}: IConfig = getConfigLocal()

  useQuery(['orderStatus'], {
    cacheTime: Number.MAX_VALUE,
    queryFn: async () =>  await getOrderStatus(),
  })

  const isExpired = dayjs(new Date())
    .diff(dayjs(createdAt), "days") >= Number(cacheTime);

  const {data ,isFetching} = useQuery(
    ['config_cms'],
    async ()=> await getConfig(), 
    {enabled: !createdAt || isExpired}, 
   )

   useEffect(()=>{
    if( data){
      createCache({
        ...transformConfig(data),
        createdAt: new Date()
      })
    }
   },[createCache, data, isExpired])

  if(isFetching) return <LoadingPage/>

  return(
    <>
      {children}
    </>
  )

}
