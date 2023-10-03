import { IparamsFetchList } from "./common.interface";

export interface IcreateLearningRate {
  name?: string;
  type?: string;
  minimum?: number;
  maximum?: number;
}

export interface IcreateSubjectPass {
  name?: string;
  type?: string;
  condition?: number;
}

export interface IcreateMoneyCredit {
  name?: string;
  moneyPerCredit?: number;
  semester?: string;
}

export interface IparamsFetchMoneyCredit extends IparamsFetchList {
  semester?: string;
}