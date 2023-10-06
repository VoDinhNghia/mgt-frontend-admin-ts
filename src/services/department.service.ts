import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreateDepartment,
  IcreateDepartmentStaff,
  IcreateMultiDepartmentStaff,
  IparamsFetchDepartments,
} from "../interfaces/department.interface";
import { setHeaderAxios } from "./auth.service";

export const createDepartment = async (payload: IcreateDepartment) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/departments`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateDepartment = async (
  id: string,
  payload: IcreateDepartment
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/departments/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteDepartmentStaff = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/departments/staff/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateDepartmentStaff = async (
  id: string,
  payload: IcreateDepartmentStaff
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/deparments/staff/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createDepartmentsStaff = async (
  payload: IcreateDepartmentStaff
) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/departments/staff`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createDepartmentMultiStaff = async (
  payload: IcreateMultiDepartmentStaff
) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/departments/staff/multi`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getDepartments = async (payload: IparamsFetchDepartments) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/departments`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
