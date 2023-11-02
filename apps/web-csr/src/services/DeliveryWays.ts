import { IDataProvider, IGetListParams } from "data_providers";
import { GraphQLClient } from "graphql-request";
import { GET_DELIVERY_WAYS } from "../../../request/src/graphql/queries";

export enum DeliveryWayEnum {
    PICKUP_STORE = 'PICKUP_STORE',
    DELIVERY = 'DELIVERY',
};

export interface IDeliveryWay {
    delivery_way_id: number;
    name: string;
    token: DeliveryWayEnum
}

export class DeliveryWays implements IDataProvider {
    constructor(private client: GraphQLClient) { }

    async getList({ pagination }: IGetListParams = {}) {
        const { limit = 20, page = 0 } = pagination ?? {}
        const { delivery_way } = await this.client.request<{ delivery_way: IDeliveryWay[] }>(GET_DELIVERY_WAYS, {
            limit,
            offset: limit * page
        })

        return delivery_way
    }
}
