/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IcreateDegreeLevel {
  name?: string;
  description?: string;
}

export interface Idegreelevel {
  _id?: string;
  name?: string;
  description?: string;
}
export interface IpropsDegreelevelPage {
  dispatch?: {
    type?: string;
    id?: string;
    payload?: {
      searchKey?: string;
      limit?: number;
      page?: number;
    };
  } | any;
  listDegreelevels?: Idegreelevel[];
  totalDegreelevel?: number;
}
