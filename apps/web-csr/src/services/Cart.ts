import { IDataProvider, IGetOneParams } from "data_providers";
import { ICartProduct } from "../data/indexedDB";
import { Table } from "dexie";

export class Cart implements IDataProvider{
  constructor(private table: Table<ICartProduct>){}

  async upsertOne(payload: ICartProduct){
    this.table.put(payload, 'productId')
  }

  async getList(){
    const data = await this.table.toArray()
  
    return [...data]
  }

  async getOne(params: IGetOneParams){
    return await this.table.get({
      productId: params.id
    })
  }

  async createOne(payload: ICartProduct){
    await this.table.add(payload)
    
    return payload
  }

  async updateOne({id, ...rest}: Partial<ICartProduct>){
    if(!id)
      throw new Error('id is needed')

    await this.table.update(id, rest)
  }

  async deleteOne(id: string | number){
    await this.table.delete(id)
  }

  async deleteMany(){
    await this.table.clear()
  }
}
