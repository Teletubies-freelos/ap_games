import { IDataProvider } from "data_providers";
import { GET_DELIVERY_COSTS } from "../../../request/src/graphql/queries";
import { GraphQLClient } from "graphql-request";
import { CREATE_DELIVERY_COSTS, CREATE_DELIVERY_COSTS_DETAIL, DELETE_DELIVERY_COSTS_BY_ID, DELETE_DELIVERY_COSTS_DETAIL_BY_ID } from "../../../request/src/graphql/mutations";

export interface IDeliveryCosts {
    delivery_costs_id: number;
    price: number;
    type: string;
    description: string;
    detail: IDeliveryCostsDetail[];
}

export interface IDeliveryCostsDetail {
    department_id: number;
    district_id: number;
    category_id: number;
    sub_category_id: number;
    delivery_costs_id: number;
}
export enum DeliveryCostsTypes {
    CONFIG_BY_DEPARTMENT = 'configByDepartment',
    ONLY_LIMA = 'onlyLima'
}

export const deliveryCostsTypesText: Record<DeliveryCostsTypes, string> = {
    [DeliveryCostsTypes.CONFIG_BY_DEPARTMENT]: 'Configuración por Departamento',
    [DeliveryCostsTypes.ONLY_LIMA]: 'Configuración distritos de Lima',
};

export class DeliveryCostsData implements IDataProvider {
    constructor(private client: GraphQLClient) { }

    async getList() {
        const { delivery_costs_aggregate } = await this.client.request<{ delivery_costs_aggregate: any }>(
            GET_DELIVERY_COSTS
        );

        return delivery_costs_aggregate?.nodes;
    }

    // async updateOne(payload: IDeliveryCosts): Promise<any> {
    //     const { update_features_by_pk } = await this.client.request<{ update_features_by_pk: boolean }>(
    //         UPDATE_FEATURED, { ...payload }
    //     );

    //     return update_features_by_pk;
    // }

    async createOne(payload: IDeliveryCosts): Promise<void | Partial<any>> {
        const { insert_delivery_costs_one } = await this.client.request<{ insert_delivery_costs_one: any }>(
            CREATE_DELIVERY_COSTS, {
                description: payload.description,
                price: payload.price,
                type: payload.type
            }
        );

        if (!insert_delivery_costs_one) {
            throw new Error("Delivery costs error")
        }
        const { response } = await this.client.request<{ response: any }>(
            CREATE_DELIVERY_COSTS_DETAIL, {
                objects: payload.detail.map((value) => ({...value, delivery_costs_id : insert_delivery_costs_one?.delivery_costs_id }))
            }
        );

        return response;
    }

    async deleteOne(id: number) {
        const { delete_delivery_costs_by_pk } = await this.client.request<{ delete_delivery_costs_by_pk: boolean }>(
            DELETE_DELIVERY_COSTS_BY_ID, { delivery_costs_id: id }
        );

        const { delete_delivery_costs_detail } = await this.client.request<{ delete_delivery_costs_detail: boolean }>(
            DELETE_DELIVERY_COSTS_DETAIL_BY_ID, { delivery_costs_id: id }
        );

        return delete_delivery_costs_by_pk && delete_delivery_costs_detail;
    }
}