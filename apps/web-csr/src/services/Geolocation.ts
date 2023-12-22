import { IDataSyncProvider, IGetListParams }  from 'data_providers'

import districts from '../../../../packages/geolocation/districts.json';
import provincies from '../../../../packages/geolocation/provincies.json';
import departments from '../../../../packages/geolocation/departments.json';

export enum ResourceNames {
  DEPARTMENT = 'department',
  PROVINCE = 'province',
  DISTRICT = 'district',
  DEPARTMENT_PRICE = 'departmentPrice',
  PROVINCE_PRICE = 'provincePrice',
  IS_LIMA = 'isLima'
}

export class GeolocationProvider implements IDataSyncProvider{
  private metropolisDistricts: typeof districts

  constructor(private metropolisId: string){
    this.metropolisDistricts = districts
      .filter(({province_id})=>province_id === metropolisId)
  }
  
  getList({filter}: IGetListParams, {resource} : {resource: ResourceNames}) : any{
    if(resource === ResourceNames.DEPARTMENT)
      return departments

    if(resource === ResourceNames.PROVINCE)
      return provincies
      .filter(({department_id})=> department_id === filter?.department_id)
    
    if(resource === ResourceNames.DISTRICT){
      if(filter?.province_id === this.metropolisId)
        return this.metropolisDistricts

      return districts
        .filter(({province_id})=> province_id === filter?.province_id)
    }

    throw new Error('Not valid resource')
  }

  getOne({ filter }: IGetListParams, { resource }: { resource: ResourceNames }) {
    if (resource === ResourceNames.DISTRICT) {
      return districts.find(({ id }) => id === filter?.province_id)?.name;
    }
    else if (resource === ResourceNames.DEPARTMENT_PRICE) {
      const district = districts.find(({ id }) => id == filter?.district_id)
      return departments.find(({ id }) => id === district?.department_id);
    }
    else if (resource === ResourceNames.PROVINCE_PRICE) {
      const district = districts.find(({ id }) => id == filter?.district_id)
      return provincies.find(({ id }) => id === district?.province_id);
    }
    else if( resource === ResourceNames.IS_LIMA){
      const districtFound = districts.find(({ id }) => id == filter?.district_id);
      return districtFound?.province_id === "1501";
    }

    throw new Error('Not valid resource')
  }

}
