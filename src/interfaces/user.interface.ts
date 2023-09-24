/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IpayloadUpdateUser {
  email?: string;
  role?: string;
  passWord?: string;
}

export interface IpayloadUpdateProfile {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  mobile?: string;
}

export interface IuserTable {
  name?: string;
}

export interface Iprofile {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  code?: string;
  gender?: string;
  mobile?: string;
}

export interface IpropUserMgt {
  dispatch?: any;
  listUsers?: any;
  totalUser?: any;
}

export interface IcolumnUserTable {
  id?: number | any;
  label?: string;
  minWidth?: number;
}

export interface IrowUserTable {
  index?: number;
  name?: string;
  email?: string;
  code?: string;
  role?: string;
  status?: string;
  award?: any;
}

export interface IpropUserMgtModal {
  dispatch?: any;
  isShowModal?: boolean | any;
  onCloseModal?: Function | any;
  userInfo?: any;
  type?: string;
  fetchUsers?: Function | any;
}

export interface IpayloadAddUser {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  mobile?: string;
  passWord?: string;
  role?: string;
  email?: string;
}
