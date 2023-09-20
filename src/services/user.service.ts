import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";
import {
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
