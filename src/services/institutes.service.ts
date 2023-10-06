import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { IcreateInstitutes } from "../interfaces/institutes.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createInstitutes = async (payload: IcreateInstitutes) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/institutes`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateInstitutes = async (
  id: string,
  payload: IcreateInstitutes
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/institutes/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteInstitutes = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/institutes/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getInstitutes = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/institutes`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
