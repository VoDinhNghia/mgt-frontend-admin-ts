import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IparamFetchFaculty,
  IparamFetchMajor,
  IpayloadCreateFaculty,
  IpayloadCreateMajor,
} from "../interfaces/faculty.interface";
import { setHeaderAxios } from "./auth.service";

export const createFaculty = async (payload: IpayloadCreateFaculty) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/faculties`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getFaculties = async (payload: IparamFetchFaculty) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/faculties`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateFaculty = async (
  id: string,
  payload: IpayloadCreateFaculty
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/faculties/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createMajor = async (payload: IpayloadCreateMajor) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/faculties/major`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getMajors = async (payload: IparamFetchMajor) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/faculties/major`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateMajor = async (id: string, payload: IpayloadCreateMajor) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/faculties/major/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteFaculty = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/faculties/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteMajor = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/faculties/major/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};
