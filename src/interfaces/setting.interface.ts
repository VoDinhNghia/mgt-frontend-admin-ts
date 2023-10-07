/* eslint-disable @typescript-eslint/no-explicit-any */
import { IparamsFetchList, IpropModalCommon } from "./common.interface";

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
  semester?: string | any;
}

export interface IparamsFetchMoneyCredit extends IparamsFetchList {
  semester?: string;
}

export interface IpropLearningRate {
  dispatch?: any;
  listLearningRates?: any;
  totalLearningRate?: number;
}

export interface IpropSubjectPass {
  dispatch?: any;
  listSubjectPass?: any;
  totalSubjectPass?: number;
}

export interface IpropMoneyCredit {
  dispatch?: any;
  listMoneyCredits?: any;
  totalMoneyCredits?: number;
}

export interface IrowTableLearningRate extends IcreateLearningRate {
  _id: string;
}

export interface IpropModalLearningRate extends IpropModalCommon {
  learningRateInfo?: any;
  fetchLearningRate?: any;
}

export interface IrowTableMoneyCredit extends IcreateMoneyCredit {
  _id?: string;
}

export interface IrowTableSubjectPass extends IcreateSubjectPass {
  _id?: string;
}
