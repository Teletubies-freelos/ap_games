import { IDataSyncProvider } from "data_providers";

export interface IConfig {
  deliveryPrice?: string
  cacheTime?: string
  createdAt?: string
}

export class LocalConfig implements IDataSyncProvider{
  constructor(private configName = 'config'){}
  
  getOne(): IConfig {
   return JSON.parse( localStorage.getItem(this.configName) ?? '{}')
  }

  createOne(config: IConfig){
    console.trace(config)
    localStorage.setItem(this.configName,JSON.stringify(config))
  }
  
}