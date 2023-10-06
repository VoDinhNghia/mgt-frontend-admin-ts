import { IparamsFetchList } from "./common.interface";

export interface IcreateCenter {
  name: string;
  introduction: string;
  director: string;
  foundYear: string;
  award: string[];
  contacts: {
    office: string;
    email: string;
    phone: string;
    fax: string;
  };
}

export interface IparamFetchListCenter extends IparamsFetchList {
  director?: string;
}
