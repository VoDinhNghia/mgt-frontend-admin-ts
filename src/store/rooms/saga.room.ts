import { takeLatest } from "redux-saga/effects";
import { roomActions } from "../actions";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
} from "../../services/room.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addNewRoom(params: IparamSaga) {
  yield addSagaCommon(createRoom, params, "Add room");
}

function* fetchRooms(params: IparamSaga) {
  yield fetchListSagaCommon(
    getRooms,
    roomActions.GET_LIST_ROOM_SUCCESS,
    "Get list room",
    params
  );
}

function* editRoom(params: IparamSaga) {
  yield updateSagaCommon(updateRoom, params, "Update room");
}

function* removeRoom(params: IparamSaga) {
  yield removeSagaCommon(deleteRoom, params, "Delete room");
}

function* RoomSaga() {
  yield takeLatest<ItakeLatestSaga>(roomActions.ADD_ROOM, addNewRoom);
  yield takeLatest<ItakeLatestSaga>(roomActions.GET_LIST_ROOM, fetchRooms);
  yield takeLatest<ItakeLatestSaga>(roomActions.UPDATE_ROOM, editRoom);
  yield takeLatest<ItakeLatestSaga>(roomActions.DELETE_ROOM, removeRoom);
}

export default RoomSaga;
