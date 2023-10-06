/* eslint-disable @typescript-eslint/no-explicit-any */
import { IparamsFetchList } from "./common.interface";

export interface IcreateTrainingPoint {
  user?: string;
  semester?: string;
  program?: string;
  status?: string;
  attendance?: string;
}

export interface IparamsFetchTrainingPoint extends IparamsFetchList {
  user?: string;
  semester?: string;
  program?: string;
}

export interface IcreateVoluntee {
  faculty?: string;
  semester?: string;
  type?: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: Date | string;
  location?: string;
  point?: number;
  numberMember?: number;
  organizingCommittee?: {
    leader?: string;
    secretary?: string;
  };
}

export interface IparamsFetchVoluntee extends IparamsFetchList {
  faculty?: string;
  semester?: string;
  leader?: string;
}

export interface IparamImportVoluntee {
  file?: any;
}

export interface IparamsImportTrainingPoint {
  file?: any;
}
