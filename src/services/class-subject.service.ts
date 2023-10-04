import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreateClass,
  IcreateSubject,
  IparmasFetchClass,
  IparmasFetchSubject,
} from "../interfaces/class-subject.interface";
import { setHeaderAxios } from "./auth.service";

export const createClass = async (payload: IcreateClass) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/class-subject/class`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createSubject = async (payload: IcreateSubject) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/class-subject/subject`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateClass = async (id: string, payload: IcreateClass) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/class-subject/class/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateSubject = async (id: string, payload: IcreateSubject) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/class-subject/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteClass = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/class-subject/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteSubject = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/class-subject/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getClasses = async (payload: IparmasFetchClass) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/class-subject/class`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const getSubjects = async (payload: IparmasFetchSubject) => {
  const res = await axios.get(
    `${STUDENT_SERVER_URL}/api/class-subject/subject`,
    {
      params: payload,
      headers: setHeaderAxios(),
    }
  );
  return res;
};
