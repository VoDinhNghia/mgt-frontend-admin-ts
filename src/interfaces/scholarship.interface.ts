import { IparamsFetchList } from "./common.interface";

export interface IcreateSholarship {
  name?: string;
  semester?: string;
  type?: string;
  content?: string;
  minimunPoints?: number;
  maximunPoints?: number;
  trainningPoints?: number;
  percentTuition?: number;
  numberCredit?: number;
  attachment?: string[];
}

export interface IcreateUserScholarship {
  semester?: string;
}

export interface IparamsFetchScholarship extends IparamsFetchList {
  semester?: string;
  type?: string;
}

export interface IparamsFetchUserScholarship {
  scholarship?: string;
  user?: string;
  semester?: string;
}
