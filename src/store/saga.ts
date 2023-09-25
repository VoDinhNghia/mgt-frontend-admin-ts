import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga.user";
import PermissionSaga from "./permissions/saga.permission";

function* rootSaga() {
  yield all([fork(UserSaga), fork(PermissionSaga)]);
}

export default rootSaga;
