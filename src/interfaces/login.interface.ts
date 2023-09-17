export interface IpayLoadLogin {
  email: string;
  passWord: string;
}

export interface IuserInfo {
  email: string;
  _id: string;
  role: string;
  status: string;
  statusLogin: boolean;
  profileId: string;
  profile: {
    _id: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
  accessToken: string;
}

export interface Ipermissions {
  moduleName: string;
  permission: string[];
}
