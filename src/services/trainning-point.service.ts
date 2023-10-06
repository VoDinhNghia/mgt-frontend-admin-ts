import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreateTrainingPoint,
  IcreateVoluntee,
  IparamImportVoluntee,
  IparamsFetchTrainingPoint,
  IparamsFetchVoluntee,
  IparamsImportTrainingPoint,
} from "../interfaces/trainning-point.interface";
import { setHeaderAxios, setMultipartHeader } from "./auth.service";

export const createTrainingPoint = async (payload: IcreateTrainingPoint) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/trainning-point`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const createVoluntee = async (payload: IcreateVoluntee) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/trainning-point/voluntee`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const importTrainningPoint = async (
  payload: IparamsImportTrainingPoint
) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/trainning-point/import`,
    payload,
    {
      headers: setMultipartHeader(),
    }
  );
  return res;
};

export const importVoluntee = async (payload: IparamImportVoluntee) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/trainning-point/import-voluntee`,
    payload,
    {
      headers: setMultipartHeader(),
    }
  );
  return res;
};

export const updateTrainningPoint = async (
  id: string,
  payload: IcreateTrainingPoint
) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/trainning-point/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateVoluntee = async (id: string, payload: IcreateVoluntee) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/trainning-point/voluntee/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteTrainningPoint = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/trainning-point/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteVoluntee = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/trainning-point/voluntee/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getTrainningPoints = async (
  payload: IparamsFetchTrainingPoint
) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/trainning-point`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const getVoluntees = async (payload: IparamsFetchVoluntee) => {
  const res = await axios.get(
    `${STUDENT_SERVER_URL}/api/trainning-point/voluntee`,
    {
      params: payload,
      headers: setHeaderAxios(),
    }
  );
  return res;
};
