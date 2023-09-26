/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { IparamSaga, IresponseAxios } from "../../interfaces/common.interface";

function* addNewRoom(params: IparamSaga): Generator<any> {
  try {
    const { payload } = params;
    const res: IresponseAxios | any = yield call(createRoom, payload);
    NotificationManager.success(res?.data?.message, "Add room", 4000);
  } catch (error: any) {
    NotificationManager.error(error?.response?.data?.message, "Add room", 4000);
  }
}

function* fetchRooms(params: IparamSaga): Generator<any> {
  try {
    const { payload } = params;
    const res: IresponseAxios | any = yield call(getRooms, payload);
    yield put({
      type: roomActions.GET_LIST_ROOM_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get list rooms",
      4000
    );
  }
}

function* editRoom(params: IparamSaga): Generator<any> {
  try {
    const { payload, id } = params;
    const res: IresponseAxios | any = yield call(updateRoom, id, payload);
    NotificationManager.success(res?.data?.data, "Add room", 4000);
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update room",
      4000
    );
  }
}

function* removeRoom(params: IparamSaga): Generator<any> {
  try {
    const { id } = params;
    const res: IresponseAxios | any = yield call(deleteRoom, id);
    NotificationManager.success(res?.data?.data, "Delete room", 4000);
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete room",
      4000
    );
  }
}

function* RoomSaga() {
  // @ts-ignore
  yield takeLatest(roomActions.ADD_ROOM, addNewRoom);
  // @ts-ignore
  yield takeLatest(roomActions.GET_LIST_ROOM, fetchRooms);
  // @ts-ignore
  yield takeLatest(roomActions.UPDATE_ROOM, editRoom);
  // @ts-ignore
  yield takeLatest(roomActions.DELETE_ROOM, removeRoom);
}

export default RoomSaga;
