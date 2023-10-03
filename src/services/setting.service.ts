import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreateLearningRate,
  IcreateMoneyCredit,
  IcreateSubjectPass,
  IparamsFetchMoneyCredit,
} from "../interfaces/setting.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createLearningRate = async (payload: IcreateLearningRate) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/settings/learning-rate`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getLearningRate = async (payload: IparamsFetchList) => {
  const res = await axios.get(
    `${STUDENT_SERVER_URL}/api/settings/learning-rate`,
    {
      params: payload,
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateLearningRate = async (
  id: string,
  payload: IcreateLearningRate
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/settings/learning-rate/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteLearningRate = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/settings/learning-rate/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createSubjectPass = async (payload: IcreateSubjectPass) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/settings/subject-pass`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getSubjectPass = async (payload: IparamsFetchList) => {
  const res = await axios.get(
    `${STUDENT_SERVER_URL}/api/settings/subject-pass`,
    {
      params: payload,
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateSubjectPass = async (
  id: string,
  payload: IcreateSubjectPass
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/settings/subject-pass/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteSubjectPass = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/settings/subject-pass/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createMoneyCredit = async (payload: IcreateMoneyCredit) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/settings/money-credit`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getMoneyCredit = async (payload: IparamsFetchMoneyCredit) => {
  const res = await axios.get(
    `${STUDENT_SERVER_URL}/api/settings/money-credit`,
    {
      params: payload,
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateMoneyCredit = async (
  id: string,
  payload: IcreateSubjectPass
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/settings/money-credit/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};
