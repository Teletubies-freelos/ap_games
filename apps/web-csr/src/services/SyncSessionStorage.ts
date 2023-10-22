import { IDataSyncProvider } from "data_providers";

export type UserInfo = {
  client_name: string;
  phone: number;
  address: string;
  email: string;
  province_id?: number;
  department_id?: number;
  district_id: number;
  payment_method_id: number;
  order_status_id: number;
  reference: string;
};

export class SyncSessionClientStorage implements IDataSyncProvider {
  static userInfoAttributes: (keyof UserInfo)[] = [
    'address',
    'email',
    'client_name',
    'phone',
    'reference',
    'district_id',
    'order_status_id',
    'payment_method_id',
  ];

   createOne(object: UserInfo) {
    Object.keys(object).forEach((key) =>
      sessionStorage.setItem(key, String(object[key as keyof UserInfo]))
    );
  }

   getOne() {
    return SyncSessionClientStorage.userInfoAttributes.reduce((acm, next) => {
      return {
        ...acm,
        [next]: sessionStorage.getItem(next),
      };
    }, {});
  }
}