import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { IcreateSemester } from "../interfaces/semester.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createSemester = async (payload: IcreateSemester) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/semesters`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getSemesters = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/semesters`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateSemester = async (id: string, payload: IcreateSemester) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/semesters/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteSemester = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/semesters/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};
