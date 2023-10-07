import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreateRegisterSubject,
  IparamsFetchStudyProcess,
} from "../interfaces/study-process.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createRegisterSubject = async (
  payload: IcreateRegisterSubject
) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/study-process/register-subject`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateRegisterSubject = async (
  id: string,
  payload: IcreateRegisterSubject
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/study-process/register-subject/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getStudyProcess = async (payload: IparamsFetchStudyProcess) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/study-process`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const getStudents = async (payload: IparamsFetchList) => {
  const res = await axios.get(
    `${STUDENT_SERVER_URL}/api/study-process/student`,
    {
      params: payload,
      headers: setHeaderAxios(),
    }
  );
  return res;
};
