import { IpropModalCommon } from "./common.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IcreateBranch {
  title?: string;
  name?: string;
  description?: string;
  website?: string;
  location?: {
    province?: string | any;
    district?: string | any;
    ward?: string | any;
    country?: string | any;
    address?: string | any;
  };
  contactInfo?: {
    email?: string | any;
    fax?: string | any;
    mobile?: string | any;
  }[];
}

export interface IpropBranchPage {
  dispatch?: any;
  listBranchs?: any;
  totalBranch?: number;
}

export interface IbranchCardItem extends IcreateBranch {
  _id?: string;
}

export interface IpropModalBranch extends IpropModalCommon {
  branchInfo?: any;
  fetchBranchs?: any;
  listCountries?: any;
  listProvinces?: any;
  listDistricts?: any;
  listWards?: any;
}

export type IbranchReadMore = any;
export type IbranchInfoReadMore = any;
