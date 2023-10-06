import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { IcreateNews, IparamsFetchNews } from "../interfaces/news.interface";
import { setHeaderAxios } from "./auth.service";

export const createNews = async (payload: IcreateNews) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/news`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateNews = async (id: string, payload: IcreateNews) => {
  const res = await axios.put(`${STUDENT_SERVER_URL}/api/news/${id}`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteNews = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/news/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getNews = async (payload: IparamsFetchNews) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/news`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
