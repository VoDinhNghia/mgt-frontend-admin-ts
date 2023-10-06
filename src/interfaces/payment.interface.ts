import { IparamsFetchList } from "./common.interface";

export interface IcreatePayment {
  user?: string;
  semester?: string;
  totalMoney?: number;
  type?: string;
  state?: string;
}

export interface IparamsFetchListPayment extends IparamsFetchList {
  faculty?: string;
}
