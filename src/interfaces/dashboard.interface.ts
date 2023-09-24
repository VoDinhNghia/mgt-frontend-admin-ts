/* eslint-disable @typescript-eslint/ban-types */

import { IpropModalCommon } from "./common.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IpropProfile {
  userInfo?: any;
  dispatch?: any;
}

export interface IpropModal extends IpropModalCommon {
  userInfo?: any;
}