/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IpayLoadLogin,
  Ipermissions,
  IuserInfo,
} from "../interfaces/login.interface";

const userItem = "user";
const permissionItem = "permissions";

export const setUserInfoToSessionStorage = (user: IuserInfo) => {
  sessionStorage.setItem(userItem, JSON.stringify(user));
};

export const setPermissionToSessionStorage = (permissions: Ipermissions[]) => {
  sessionStorage.setItem(permissionItem, JSON.stringify(permissions));
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem(userItem);
  return user ? JSON.parse(user) : {};
};

export const getPermission = () => {
  const permissions = sessionStorage.getItem(permissionItem);
  const permissionList = permissions ? JSON.parse(permissions) : [];
  return permissionList;
};

export const setHeaderAxios = () => {
  const currentUser = getCurrentUser();
  const headers = {
    Authorization: `Bearer ${currentUser?.accessToken}`,
    "Content-Type": "application/json",
  };
  return headers;
};

export const setMultipartHeader = () => {
  const currentUser = getCurrentUser();
  const headers = {
    Authorization: `Bearer ${currentUser?.accessToken}`,
    "Content-Type": "multipart/form-data",
  };
  return headers;
};

export const login = async (payload: IpayLoadLogin | any) => {
  try {
    const res = await axios.post(`${STUDENT_SERVER_URL}/api/auth/login`, payload);
    setUserInfoToSessionStorage(res?.data?.data);
    return res?.data;
  } catch (error: any) {
    return {
      message: error?.response?.data?.message,
    };
  }
};

export const fetchPermissions = async (payload: {
  user: string;
}): Promise<void> => {
  try {
    const res = await axios.get(`${STUDENT_SERVER_URL}/api/permissions`, {
      params: payload,
      headers: setHeaderAxios(),
    });
    const permissions = res?.data?.data?.results?.map((per: Ipermissions) => {
      return {
        moduleName: per?.moduleName,
        permission: per?.permission,
      };
    });
    setPermissionToSessionStorage(permissions);
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => {
  sessionStorage.clear();
}
