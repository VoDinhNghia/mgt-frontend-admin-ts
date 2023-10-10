/* eslint-disable @typescript-eslint/no-explicit-any */

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
