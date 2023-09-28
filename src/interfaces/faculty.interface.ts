import { IparamsFetchList } from "./common.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IpayloadCreateFaculty {
  name?: string;
  introduction?: string;
  foundYear?: Date | any;
  award?: string[] | any[];
  headOfSection?: string;
  eputeHead?: string;
}

export interface IparamFetchFaculty extends IparamsFetchList {
  type?: string;
}

export interface IpayloadCreateMajor {
  name?: string;
  introduction?: string;
  foundYear?: Date | any;
  award?: string[] | any[];
  headOfSection?: string;
  eputeHead?: string;
  faculty?: string;
}

export interface IparamFetchMajor extends IparamsFetchList {
  faculty?: string;
}

export interface IpropFacultyMgt {
  dispatch?: any;
  listFaculties?: any;
  listMajors?: any;
  totalFaculty?: number;
  totalMajor?: number;
}
