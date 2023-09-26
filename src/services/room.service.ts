import axios from "axios";
import { STUDENT_SERVER_URL } from "../constants/constant";
import {
  IpayloadCreateRoom,
  IpayloadFetchRooms,
} from "../interfaces/room.interface";
import { setHeaderAxios } from "./auth.service";

export const createRoom = async (payload: IpayloadCreateRoom) => {
  const res = await axios.post(`${STUDENT_SERVER_URL}/api/rooms`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getRooms = async (payload: IpayloadFetchRooms) => {
  const res = await axios.get(`${STUDENT_SERVER_URL}/api/rooms`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateRoom = async (id: string, payload: IpayloadCreateRoom) => {
  const res = await axios.put(
    `${STUDENT_SERVER_URL}/api/rooms/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const deleteRoom = async (id: string) => {
  const res = await axios.delete(`${STUDENT_SERVER_URL}/api/rooms/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};
