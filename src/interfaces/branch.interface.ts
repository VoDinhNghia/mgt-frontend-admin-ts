/* eslint-disable @typescript-eslint/no-explicit-any */
import { IpropModalCommon } from "./common.interface";
import { Icountries, Idistrict, Iprovince, Iward } from "./countries.interface";

export interface IbranchCommonInfo {
  title?: string;
  name?: string;
  description?: string;
  website?: string;
}

export interface IcontactInfo {
  email?: string;
  fax?: string;
  mobile?: string;
}
export interface IcreateBranch extends IbranchCommonInfo {
  location?: {
    province?: string;
    district?: string;
    ward?: string;
    country?: string;
    address?: string;
  };
  contactInfo?: IcontactInfo[];
}

export interface IpropBranchPage {
  dispatch?: {
    type?: string;
    id?: string;
    payload?: {
      limit?: number;
      page?: number;
      searchKey?: string;
    };
  } | any;
  listBranchs?: IbranchCardItem[];
  totalBranch?: number;
}
export interface IbranchCardItem extends IbranchCommonInfo {
  _id?: string;
  location?: {
    country?: Icountries;
    province?: Iprovince;
    district?: Idistrict;
    ward?: Iward;
    address?: string;
  };
  contactInfo?: IcontactInfo[];
}

export interface IpropModalBranch extends IpropModalCommon {
  branchInfo?: IbranchCardItem;
  fetchBranchs?: any;
  listCountries?: Icountries[] | any;
  listProvinces?: Iprovince[] | any;
  listDistricts?: Idistrict[] | any;
  listWards?: Iward[] | any;
}

export type IbranchReadMore = any;
export type IbranchInfoReadMore = any;
