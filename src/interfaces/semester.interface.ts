/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpropModalCommon } from "./common.interface";

export interface IcreateSemester {
  name?: string;
  year?: string;
}

export interface IpropSemester {
  dispatch?: any;
  listSemesters?: any;
  totalSemester?: number;
}

export interface IrowTableSemester extends IcreateSemester {
  _id?: string;
  code?: string;
}

export interface IpropModalSemester extends IpropModalCommon {
  fetchSemesters?: any;
  semesterInfo?: any;
}
