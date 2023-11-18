import { IDataProvider } from "data_providers";
import { GraphQLClient } from "graphql-request";
import { GET_CONFIG } from "../../../request/src/graphql/queries";

export interface IConfig {
    config_id: number;
    name: string;
    name_es: string;
    value: number;
    meta: string;
    token: string;
}

export interface IConfigValue {
    [key: string]: number | undefined;
}

export class Config implements IDataProvider {
    constructor(private client: GraphQLClient) { }

    async getOne() {
        const { configs } = await this.client.request<{ configs: IConfig[] }>(GET_CONFIG)

        return convertTokenToValues(configs)
    }
}

function convertTokenToValues(configs: IConfig[]): IConfigValue {
    const configObject: IConfigValue = {};

    configs.forEach(config => {
        configObject[config.token] = config.value;
    });

    return configObject
}