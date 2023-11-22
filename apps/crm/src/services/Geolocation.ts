import { IDataProvider, IGetListParams } from "data_providers";
import { GraphQLClient } from "graphql-request";
import departments from '../../../../packages/geolocation/departments.json';
import districts from '../../../../packages/geolocation/districts.json';

export enum GeolocationPathEnum {
    BY_DEPARTMENT = 'byDepartment',
    ONLY_DISTRICTS_LIMA = 'onlyLima'
}
export interface IGeolocation {
    value: string;
    label: string;
}

export class GeolocationData implements IDataProvider {
    // @ts-ignore
    constructor(private client: GraphQLClient) { }

    async getList({ filter }: IGetListParams, { path }: { path: GeolocationPathEnum })  {
        if (path == GeolocationPathEnum.BY_DEPARTMENT) {
            return departments?.filter(({ name }) => name.toUpperCase().includes(filter?.search?.toUpperCase()))
                .map(({id, name}) => ({
                    value: id,
                    label: name
                }));
        }
        else if (path == GeolocationPathEnum.ONLY_DISTRICTS_LIMA) {
            return districts?.filter(({ name, province_id, department_id }) => province_id == "1501" && department_id == "15" && name?.toUpperCase().includes(filter?.search?.toUpperCase()))
                .map(({id, name}) => ({
                    value: id,
                    label: name
                }));
        }

        return [];
    }
}