import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga.user";
import PermissionSaga from "./permissions/saga.permission";
import RoomSaga from "./rooms/saga.room";

function* rootSaga() {
  yield all([fork(UserSaga), fork(PermissionSaga), fork(RoomSaga)]);
}

export default rootSaga;
