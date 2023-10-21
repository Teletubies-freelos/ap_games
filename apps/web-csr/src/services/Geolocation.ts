import { IDataSyncProvider, IGetListParams }  from 'data_providers'

import districts from '../../../../packages/geolocation/districts.json';
import provincies from '../../../../packages/geolocation/provincies.json';
import departments from '../../../../packages/geolocation/departments.json';

export enum ResourceNames {
  DEPARTMENT = 'department',
  PROVINCE = 'province',
  DISTRICT = 'district'
}

export class GeolocationProvider implements IDataSyncProvider{
  private metropolisDistricts: typeof districts

  constructor(private metropolisId: string){
    this.metropolisDistricts = districts
      .filter(({province_id})=>province_id === metropolisId)
  }
  
  getList({filter}: IGetListParams, {resource} : {resource: ResourceNames}){
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
}
