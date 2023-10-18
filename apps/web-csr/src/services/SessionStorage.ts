import { IDataProvider } from "data_providers";

export type UserInfo = {
  fullName: string;
  phone: number;
  address: string;
  reference: string;
  email: string;
};


export class SessionClientStorage implements IDataProvider {
  static userInfoAttributes: (keyof UserInfo)[] = ['address', 'email','fullName', 'phone', 'reference']

  async createOne(object: UserInfo) {
    Object
      .keys(object)
      .forEach((key) => sessionStorage.setItem(key, String(object[key as keyof UserInfo])))
  }

  async getOne(){
    return SessionClientStorage.userInfoAttributes.reduce((acm, next)=>{
      return {
        ...acm,
        [next]: sessionStorage.getItem(next)
      }
    }, {})

  }
}
