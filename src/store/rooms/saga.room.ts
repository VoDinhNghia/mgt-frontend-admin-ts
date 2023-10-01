/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import { call, put, takeLatest } from "redux-saga/effects";
import { roomActions } from "../actions";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
} from "../../services/room.service";
import {
  IparamSaga,
  IresponseAxios,
  IreturnTypeSaga,
  ItakeLatestSaga,
} from "../../interfaces/common.interface";
import { AxiosError } from "axios";

function* addNewRoom(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(createRoom, payload);
    NotificationManager.success(res?.data?.message, "Add room", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Add room",
        4000
      );
    }
  }
}

function* fetchRooms(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(getRooms, payload);
    yield put({
      type: roomActions.GET_LIST_ROOM_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Get list rooms",
        4000
      );
    }
  }
}

function* editRoom(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload, id } = params;
    const res: IresponseAxios = yield call(updateRoom, id, payload);
    NotificationManager.success(res?.data?.message, "Add room", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Update room",
        4000
      );
    }
  }
}

function* removeRoom(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { id } = params;
    const res: IresponseAxios = yield call(deleteRoom, id);
    NotificationManager.success(res?.data?.message, "Delete room", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Delete room",
        4000
      );
    }
  }
}

function* RoomSaga() {
  yield takeLatest<ItakeLatestSaga>(roomActions.ADD_ROOM, addNewRoom);
  yield takeLatest<ItakeLatestSaga>(roomActions.GET_LIST_ROOM, fetchRooms);
  yield takeLatest<ItakeLatestSaga>(roomActions.UPDATE_ROOM, editRoom);
  yield takeLatest<ItakeLatestSaga>(roomActions.DELETE_ROOM, removeRoom);
}

export default RoomSaga;
