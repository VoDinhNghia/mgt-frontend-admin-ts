import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreateSholarship,
  IcreateUserScholarship,
  IparamsFetchScholarship,
  IparamsFetchUserScholarship,
} from "../interfaces/scholarship.interface";
import { setHeaderAxios } from "./auth.service";

export const createScholarship = async (payload: IcreateSholarship) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/scholarships`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateScholarship = async (
  id: string,
  payload: IcreateSholarship
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/scholarships/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createUserScholarship = async (
  payload: IcreateUserScholarship
) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/scholarships/user`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getScholarships = async (payload: IparamsFetchScholarship) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/scholarships`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteScholarship = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/scholarships/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getUserScholarships = async (
  payload: IparamsFetchUserScholarship
) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/scholarships/user`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteUserScholarship = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/scholarships/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};
