import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga.user";
import PermissionSaga from "./permissions/saga.permission";
import RoomSaga from "./rooms/saga.room";
import FacultySaga from "./faculties/saga.faculty";
import SettingSaga from "./settings/saga.setting";

function* rootSaga() {
  yield all([
    fork(UserSaga),
    fork(PermissionSaga),
    fork(RoomSaga),
    fork(FacultySaga),
    fork(SettingSaga),
  ]);
}

export default rootSaga;
