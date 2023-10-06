import { IparamsFetchList } from "./common.interface";

export interface IcreateNews {
  title?: string;
  content?: string;
  type?: string;
  url?: string;
  attachment?: string[];
}

export interface IparamsFetchNews extends IparamsFetchList {
  type?: string;
}
