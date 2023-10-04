import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { IcreateBranch } from "../interfaces/branch.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createBranch = async (payload: IcreateBranch) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/branchs`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateBranch = async (id: string, payload: IcreateBranch) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/branchs/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteBranch = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/branchs/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getBranch = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/branchs`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
