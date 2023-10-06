import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreateCenter,
  IparamFetchListCenter,
} from "../interfaces/center.interface";
import { setHeaderAxios } from "./auth.service";

export const createCenter = async (payload: IcreateCenter) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/centers`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getCenters = async (payload: IparamFetchListCenter) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/centers`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateCenters = async (id: string, payload: IcreateCenter) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/centers/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteCenters = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/centers/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};
