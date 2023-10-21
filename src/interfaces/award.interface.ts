import { IparamsFetchList } from "./common.interface";

export interface IcreateAward {
  name?: string;
  time?: Date | string;
  attachment?: string[];
  location?: string;
  type?: string;
  description?: string;
}

export interface IparamsFetchAward extends IparamsFetchList {
  type?: string;
  fromDate?: Date | string;
  toDate?: Date | string;
}
