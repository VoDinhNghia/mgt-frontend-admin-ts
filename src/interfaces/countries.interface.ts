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
  _id?: string;
  name?: string;
  flag?: string;
  countryId?: string;
  capital?: string;
  status?: string;
}

export interface Iprovince {
  _id?: string;
  name?: string;
  code?: string;
  countryId?: Icountries;
  phoneCode?: string;
  codeName?: string;
  capital?: string;
}

export interface Idistrict {
  _id?: string;
  name?: string;
  countryId?: Icountries;
  provinceId?: Iprovince;
  phoneCode?: string;
  codeName?: string;
  code?: string;
}

export interface Iward {
  _id?: string;
  name?: string;
  countryId?: Icountries;
  provinceId?: Iprovince;
  districtId?: Idistrict;
  phoneCode?: string;
  codeName?: string;
  code?: string;
}
