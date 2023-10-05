import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { IcreateDegreeLevel } from "../interfaces/degreelevel.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createDegreelevel = async (payload: IcreateDegreeLevel) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/degreelevels`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateDegreelevel = async (
  id: string,
  payload: IcreateDegreeLevel
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/degreelevels/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteDegreelevel = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/degreelevels/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getDegreelevels = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/degreelevels`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
