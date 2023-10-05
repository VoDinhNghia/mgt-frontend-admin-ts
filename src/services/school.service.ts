import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { Ischool } from "../interfaces/school.interface";
import { setHeaderAxios } from "./auth.service";

export const updateSchool = async (id: string, payload: Ischool) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/school/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getSchool = async () => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/school`, {
    headers: setHeaderAxios(),
  });
  return res;
};
