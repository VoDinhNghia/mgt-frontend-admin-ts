import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { setHeaderAxios } from "./auth.service";
import { IcreateAward, IparamsFetchAward } from "../interfaces/award.interface";

export const createAward = async (payload: IcreateAward) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/awards`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getAwards = async (payload: IparamsFetchAward) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/awards`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateAward = async (id: string, payload: IcreateAward) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/awards/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteAward = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/awards/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};
