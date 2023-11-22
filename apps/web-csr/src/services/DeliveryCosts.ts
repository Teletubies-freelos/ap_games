import { IDataProvider, IGetListParams } from "data_providers";
import { GET_DELIVERY_COSTS, GET_DELIVERY_COSTS_DETAIL_BY_PARAM } from "../../../request/src/graphql/queries";
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

export interface IDeliveryCostsDetailResponse {
    delivery_cost: {
        price: number,
        description: string,
        type: string
    }
    district_id: number;
    department_id: number;
    delivery_costs_id: number;
    delivery_costs_detail_id: number;
    sub_category_id: number;
}

export class DeliveryCostsData implements IDataProvider {
    constructor(private client: GraphQLClient) { }

    async getList() {
        const { delivery_costs_aggregate } = await this.client.request<{ delivery_costs_aggregate: any }>(
            GET_DELIVERY_COSTS
        );

        return delivery_costs_aggregate?.nodes;
    }

    async getOne(params: IGetListParams, { department_id, district_id, category_id, sub_category_id }: { department_id: number, district_id: number, category_id: number, sub_category_id: number }): Promise<IDeliveryCostsDetailResponse[]> {
        const { delivery_costs_detail } = await this.client.request<{ delivery_costs_detail: IDeliveryCostsDetailResponse[] }>(
            GET_DELIVERY_COSTS_DETAIL_BY_PARAM, { department_id, district_id, category_id, sub_category_id }
        );

        return delivery_costs_detail;
    }

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
            objects: payload.detail.map((value) => ({ ...value, delivery_costs_id: insert_delivery_costs_one?.delivery_costs_id }))
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