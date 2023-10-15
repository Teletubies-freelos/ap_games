import { IDataProvider } from "data_providers";
import { ICartProduct } from "../data/indexedDB";
import { Table } from "dexie";

export class Cart implements IDataProvider{
  constructor(private table: Table<ICartProduct>){}

  async getList(){
    return await this.table.toArray()
  }

  async createOne(payload: ICartProduct){
    await this.table.add(payload)
    
    return payload
  }
}
