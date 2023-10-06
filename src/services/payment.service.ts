import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IcreatePayment,
  IparamsFetchListPayment,
} from "../interfaces/payment.interface";
import { setHeaderAxios } from "./auth.service";

export const createPayment = async (payload: IcreatePayment) => {
  const res = await axios.post(
    `${STUDENT_SERVER_URL}/api/payments/user-tuition`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const getPayments = async (payload: IparamsFetchListPayment) => {
  const res = await axios.get(
    `${STUDENT_SERVER_URL}/api/payments/user-tuition`,
    {
      params: payload,
      headers: setHeaderAxios(),
    }
  );
  return res;
};
