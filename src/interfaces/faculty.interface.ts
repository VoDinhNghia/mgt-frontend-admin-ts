/* eslint-disable @typescript-eslint/ban-types */
import { IparamsFetchList, IpropModalCommon } from "./common.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IpayloadCreateFaculty {
  name?: string;
  introduction?: string;
  foundYear?: Date | any;
  award?: string[] | any[];
  headOfSection?: string | any;
  eputeHead?: string | any;
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

export interface IpropFacultyTab {
  dispatch?: any;
  listFaculties?: any;
  totalFaculty?: number;
}

export interface IpropMajorTab {
  dispatch?: any;
  listMajors?: any;
  totalMajor?: number;
}

export interface IrowFacutyTable extends IpayloadCreateFaculty {
  _id?: string;
}

export interface IrowMajorTable {
  _id?: string;
  name?: string;
  faculty?: {
    _id?: string;
    name?: string;
  };
  introduction?: string;
  foundYear?: string;
  award?: any;
  headOfSection?: {
    _id: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
  eputeHead: {
    _id: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
}

export interface IpropModalFaculty extends IpropModalCommon {
  facultyInfo?: any;
  fetchFaculties?: Function | any;
  listUsers?: any;
}

export type IfacultyReadMore = any;
export type ImajorReadMore = any;

export interface IpropModalMajor extends IpropModalCommon {
  majorInfo?: any;
  fetchMajors?: Function | any;
  listUsers?: any;
  listFaculties?: any;
}
