import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const getMeInfo = async () => {
  const res = await axios(`${STUDENT_SERVER_URL}/api/auth/me`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getUserList = async (payload: IparamsFetchList) => {
  const res = await axios(`${STUDENT_SERVER_URL}/api/users`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
