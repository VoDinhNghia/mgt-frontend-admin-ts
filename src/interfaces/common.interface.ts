/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IeventOnchangeInput {
  target: {
    value: string;
  };
}

export type IeventOnchangeSelect = any;

export interface IparamsFetchList {
  searchKey?: string;
  page?: number;
  limit?: number;
}

export interface IactionRedux {
  type: string;
  payload: any;
}

export interface IparamSaga {
  payload: any;
  id: string;
}

export interface IresponseAxios {
  data: {
    statusCode: number;
    data: any;
    message: string;
  };
}

export type IreturnTypeSaga = any;
export type ItakeLatestSaga = any;

export interface IuserReducer {
  listUsers?: object[] | string | number | boolean | any;
  totalUser?: number;
  userInfo?: any;
  dispatch?: any;
  listAdmins?: any;
}

export interface IstateRedux {
  UserReducer: IuserReducer;
  PermissionReducer: {
    listPermissions: any;
    totalPermission: number;
  };
  RoomReducer: {
    listRooms: any;
    totalRoom: number;
  };
  FacultyReducer: {
    listFaculties: any;
    totalFaculty: number;
    listMajors: any;
    totalMajor: number;
  };
}

export interface IpropsNavToggle {
  expand: boolean;
  setExpand: Function;
}

export interface IpropAddAndSearchTable {
  dispatch?: any;
  title?: string;
  onSearch?: Function | any;
  onShowAdd?: Function | any;
  isDisableBtnAdd?: boolean | any;
}

export interface IpropModalCommon {
  dispatch?: any;
  isShowModal?: boolean | any;
  onCloseModal?: Function | any;
  type?: string;
}

export type IeventOnchangeFile = any;

export interface IpropReadMore {
  children?: any;
  isReadMore?: boolean | any;
  setReadMore?: Function | any;
  lengthSlice?: number;
}
