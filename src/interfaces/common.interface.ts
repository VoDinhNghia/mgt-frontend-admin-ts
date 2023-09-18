/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IeventOnchangeInput {
  target: {
    value: string;
  };
}

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
  payload: IactionRedux;
  id: string;
}

export interface IresponseAxios {
  data: {
    statusCode: number;
    data: any;
    message: string;
  };
}

export interface IuserReducer {
  listUsers?: object[] | string | number | boolean | any;
  totalUser?: number;
  userInfo?: any;
  dispatch?: any;
}
export interface IstateRedux {
  UserReducer: IuserReducer;
}