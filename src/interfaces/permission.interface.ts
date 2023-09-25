import { IpropModalCommon } from "./common.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IcolumnPermissionTable {
  id?: string;
  label?: string;
  minWidth?: number;
}

export interface IrowPermissionTable {
  _id?: string | any;
  profile?: any;
  index?: string;
  name?: string;
  code?: string;
  moduleName?: string;
}

export interface IpropPermission {
  dispatch?: any;
  listAdmins?: any;
}

export interface IpropModalPermission extends IpropModalCommon {
  adminInfo?: any;
}
