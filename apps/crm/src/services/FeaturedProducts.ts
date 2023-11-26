import { IDataProvider } from "data_providers";
import { GET_FEATURED_PRODUCTS } from "../../../request/src/graphql/queries";
import { GraphQLClient } from "graphql-request";
import { CREATE_FEATURED, DELETE_FEATURED, UPDATE_FEATURED } from "../../../request/src/graphql/mutations";

export interface IFeaturedProduct {
    is_offer: boolean;
    featured_id: number;
    product_id: number;
    offer_price: number;
    price: number;
    banner_img_url: string;
    description: string;
    title: string;
    product: {
        name: string;
    }
}

export class FeaturedProductsData implements IDataProvider {
    constructor(private client: GraphQLClient) { }

    async getList() {
        const { featureds } = await this.client.request<{ featureds: IFeaturedProduct[] }>(
            GET_FEATURED_PRODUCTS
        );

        return featureds;
    }

    async updateOne(payload: IFeaturedProduct): Promise<any> {
        const { update_features_by_pk } = await this.client.request<{ update_features_by_pk: boolean }>(
            UPDATE_FEATURED, { ...payload }
        );

        return update_features_by_pk;
    }

    async createOne(payload: IFeaturedProduct): Promise<void | Partial<any>> {
        const { featureds } = await this.client.request<{ featureds: IFeaturedProduct[] }>(
            CREATE_FEATURED, { 
                is_offer: payload?.is_offer,
                product_id: payload?.product_id,
                offer_price: payload?.offer_price,
                price: payload?.price,
                banner_img_url: payload?.banner_img_url,
                description: payload?.description,
                title: payload?.title
            }
        );

        return featureds;
    }

    async deleteOne(id: number) {
        const { delete_feature_by_pk } = await this.client.request<{ delete_feature_by_pk: boolean }>(
            DELETE_FEATURED, { featured_id: id }
        );

        return delete_feature_by_pk;
    }
}