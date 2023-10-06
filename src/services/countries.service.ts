import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { setHeaderAxios } from "./auth.service";
import {
  Icountries,
  IparamsFetchDistrict,
  IparamsFetchProvince,
  IparamsFetchWard,
} from "../interfaces/countries.interface";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createCountry = async () => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/countries/init-data`,
    {},
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createProvince = async () => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/countries/province/init-data`,
    {},
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createDistrict = async () => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/countries/district/init-data`,
    {},
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createWard = async () => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/countries/ward/init-data`,
    {},
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateCountry = async (id: string, payload: Icountries) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/countries/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getCountries = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/countries`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const getProvinces = async (payload: IparamsFetchProvince) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/countries/provinces`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const getDistricts = async (payload: IparamsFetchDistrict) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/countries/districts`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const getWards = async (payload: IparamsFetchWard) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/countries/wards`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};
