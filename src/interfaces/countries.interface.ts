import { IparamsFetchList } from "./common.interface";

export interface IparamsFetchProvince extends IparamsFetchList {
  countryId?: string;
}

export interface IparamsFetchDistrict extends IparamsFetchList {
  provinceId?: string;
}

export interface IparamsFetchWard extends IparamsFetchList {
  countryId?: string;
  provinceId?: string;
  districtId?: string;
}

export interface Icountries {
  name?: string;
  flag?: string;
  countryId?: string;
  capital?: string;
  status?: string;
}
