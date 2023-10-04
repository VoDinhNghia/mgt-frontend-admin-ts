/* eslint-disable @typescript-eslint/no-explicit-any */

import { IparamsFetchList } from "./common.interface";

export interface IcreateAward {
  name?: string;
  time?: Date | string | any;
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
