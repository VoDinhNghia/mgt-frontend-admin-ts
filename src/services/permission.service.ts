import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import { IpayloadAddPermission } from "../interfaces/permission.interface";
import { setHeaderAxios } from "./auth.service";

export const createPermission = async (payload: IpayloadAddPermission) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/permissions`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deletePermission = async (id: string) => {
  const res = await axios.delete(
    `${STUDENT_SERVER_URL}/api/permissions/${id}`,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};
