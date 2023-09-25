import axios from "axios";
import { STUDENT_SERVER_URL, userRoles } from "../constants/constant";
import { setHeaderAxios, setMultipartHeader } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";
import {
  IpayloadAddUser,
  IpayloadImportUser,
  IpayloadUpdateProfile,
  IpayloadUpdateUser,
} from "../interfaces/user.interface";

export const getMeInfo = async () => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/auth/me`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getUserList = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/users`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateUser = async (id: string, payload: IpayloadUpdateUser) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/users/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateProfile = async (
  id: string,
  payload: IpayloadUpdateProfile
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/users/profile/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const addUser = async (payload: IpayloadAddUser) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/users`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/users/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const importUser = async (payload: IpayloadImportUser) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/users/import-user`,
    payload,
    {
      headers: setMultipartHeader(),
    }
  );
  return res;
};

export const getListAdmin = async () => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/users`, {
    params: {
      role: userRoles.ADMIN,
    },
    headers: setHeaderAxios(),
  });
  return res;
}
