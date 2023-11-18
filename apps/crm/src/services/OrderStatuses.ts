import { IDataProvider } from "data_providers";
import { GET_ORDER_STATUSES } from "../../../request/src/graphql/queries";
import { GraphQLClient } from "graphql-request";

export enum OrderStatusesEnum {
    PAID = 'paid',
    PENDING = 'pending',
    CANCELED = 'canceled',
    DELIVERED = 'delivered',
}

export interface IOrderStatuses {
    order_status_id: number;
    name: OrderStatusesEnum;
    description: string;
}
export const orderStatusText: Record<OrderStatusesEnum, string> = {
    [OrderStatusesEnum.PAID]: 'Pagado',
    [OrderStatusesEnum.PENDING]: 'Pago pendiente',
    [OrderStatusesEnum.CANCELED]: 'Cancelado',
    [OrderStatusesEnum.DELIVERED]: 'Enviado',
};

export class OrdersStatusesData implements IDataProvider {
    constructor(private client: GraphQLClient) { }

    async getList() {
        const { order_statuses } = await this.client.request<{ order_statuses: IOrderStatuses[] }>(
            GET_ORDER_STATUSES
        );

        return order_statuses.map((status) => ({ ...status, description: orderStatusText[status.name] }));
    }
}