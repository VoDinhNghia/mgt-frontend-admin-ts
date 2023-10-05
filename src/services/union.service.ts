import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreateUnionImage,
  IcreateUnionMember,
  IcreateUnions,
  IparamsGetUnionImage,
  IparamsGetUnionMember,
} from "../interfaces/union.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createUnion = async (payload: IcreateUnions) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/unions`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateUnion = async (id: string, payload: IcreateUnions) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/unions/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteUnion = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/unions/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getUnions = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/unions`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const createUnionImage = async (payload: IcreateUnionImage) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/unions/image`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateUnionImage = async (
  id: string,
  payload: IcreateUnionImage
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/unions/image/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteUnionImage = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/unions/image/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getUnionImage = async (payload: IparamsGetUnionImage) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/unions/image`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const createUnionMember = async (payload: IcreateUnionMember) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/unions/member`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateUnionMember = async (
  id: string,
  payload: IcreateUnionMember
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/unions/member/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteUnionMember = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/unions/member/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getUnionMember = async (payload: IparamsGetUnionMember) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/unions/member`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
