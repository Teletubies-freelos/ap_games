import { IDataProvider, IGetListParams } from "data_providers";
import { GraphQLClient } from "graphql-request";
import departments from '../../../../packages/geolocation/departments.json';
import districts from '../../../../packages/geolocation/districts.json';
import provinces from '../../../../packages/geolocation/provincies.json';

export enum GeolocationPathEnum {
    BY_DEPARTMENT = 'byDepartment',
    ONLY_DISTRICTS_LIMA = 'onlyLima',
    GET_PROVINCE = 'getProvince',
    GET_DEPARMENT = 'getDeparments',
    GET_DISTRICTS = 'getDistrics',
    GET_ALL = 'getALL'
}
export interface IGeolocation {
    value: string;
    label: string;
}
export enum SubPath {
    GET_ALL = 'getAll',
    GET_FILTERED = 'getFiltered'
}

export class GeolocationData implements IDataProvider {
    // @ts-ignore
    constructor(private client: GraphQLClient) { }
    // @ts-ignore
    async getList({ filter }: IGetListParams, { path, subPath }: { path: GeolocationPathEnum, subPath: SubPath }) {
        if (subPath == SubPath.GET_FILTERED && path == GeolocationPathEnum.GET_DEPARMENT) {
            console.log({filter})
            return departments?.filter(({ name }) => name.toUpperCase().includes(filter?.search?.toUpperCase()))
                .map(({ id, name }) => ({
                    value: id,
                    label: name
                }));
        }
        else if (subPath == SubPath.GET_FILTERED && path == GeolocationPathEnum.ONLY_DISTRICTS_LIMA) {
            return districts?.filter(({ name, province_id, department_id }) => province_id == "1501" && department_id == "15" && name?.toUpperCase().includes(filter?.search?.toUpperCase()))
                .map(({ id, name }) => ({
                    value: id,
                    label: name
                }));
        }
        else if (subPath == SubPath.GET_ALL && path == GeolocationPathEnum.ONLY_DISTRICTS_LIMA) {
            return districts?.filter(({ id, province_id, department_id }) => province_id == "1501" && department_id == "15" && filter.values.includes(parseInt(id)))
                .map(({ id, name }) => ({
                    value: id,
                    label: name
                }));
        }
        else if (subPath == SubPath.GET_ALL && path == GeolocationPathEnum.BY_DEPARTMENT) {
            return departments?.filter(({ id }) => filter.values.includes(parseInt(id)))
                .map(({ id, name }) => ({
                    value: id,
                    label: name
                }));
        }
        else if (subPath == SubPath.GET_ALL && path == GeolocationPathEnum.GET_DEPARMENT) {
            console.log("AAA")
            return departments.map(({ id, name }) => ({ value: id, label: name }))
        }
        else if (subPath == SubPath.GET_FILTERED && path == GeolocationPathEnum.GET_PROVINCE) {
            return provinces.filter(({ department_id, name }) => filter?.deparments.includes(department_id) && name?.toUpperCase().includes(filter?.search?.toUpperCase()))
                .map(({ id, name }) => ({
                    value: id,
                    label: name
                }));
        }
        else if (subPath == SubPath.GET_FILTERED && path == GeolocationPathEnum.GET_DISTRICTS) {
            return districts?.filter(({ name, province_id, department_id }) =>
                filter?.deparments.includes(department_id) &&
                filter?.provinces.includes(province_id) &&
                name?.toUpperCase().includes(filter?.search?.toUpperCase()))
                .map(({ id, name }) => ({
                    value: id,
                    label: name
                }));
        }
        else if (subPath == SubPath.GET_FILTERED && path == GeolocationPathEnum.GET_ALL) {
            return {
                deparments: departments.filter(({ id }) => filter.departmentsIds.includes(id))?.map(({ id, name }) => ({ value: id, label: name })),
                provinces: provinces.filter(({ id }) => filter.provincesIds.includes(id))?.map(({ id, name }) => ({ value: id, label: name })),
                districts: districts.filter(({ id }) => filter.districtIds.includes(id))?.map(({ id, name }) => ({ value: id, label: name }))
            }
        }
        
        return [];
    }
}