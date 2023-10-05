import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { IcreateCourse } from "../interfaces/course.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createCourse = async (payload: IcreateCourse) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/courses`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateCourse = async (id: string, payload: IcreateCourse) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/courses/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteCourse = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/courses/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getCourses = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/courses`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
