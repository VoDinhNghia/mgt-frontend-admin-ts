/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IparamsFetchList, IpropModalCommon } from "./common.interface";

export interface IpayloadCreateRoom {
  name?: string;
  type?: string;
  capacity?: number;
  divice?: {
    airConditioner?: string;
    projector?: string;
    status?: string;
  };
  description?: string;
}

export interface IpayloadFetchRooms extends IparamsFetchList {
  type?: string;
}

export interface IpropRoomMgt {
  dispatch?: any;
  listRooms?: any;
  totalRoom?: number;
}

export interface IrowTableRoom extends IpayloadCreateRoom {
  _id?: string;
  createdBy?: string;
}

export interface IpropModalRoom extends IpropModalCommon {
  roomInfo?: IrowTableRoom;
  fetchRooms?: Function | any;
  size?: string | any;
}

export type IallStateReadMore = any;
export type IroomInfoReadMore = any;
