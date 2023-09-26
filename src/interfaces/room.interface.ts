/* eslint-disable @typescript-eslint/no-explicit-any */
import { IparamsFetchList } from "./common.interface";

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
