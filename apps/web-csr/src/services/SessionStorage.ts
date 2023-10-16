import { IDataProvider } from "data_providers";

export class SessionStorage implements IDataProvider {
  async createOne(object: Record<string, string | number>) {
    Object
      .keys(object)
      .forEach((key) => sessionStorage.setItem(key, String(object[key])))
  }
}
