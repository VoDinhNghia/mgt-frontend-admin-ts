import { takeLatest } from "redux-saga/effects";
import {
  getMeInfo,
  getUserList,
  updateProfile,
  updateUser,
  addUser,
  deleteUser,
  importUser,
  getListAdmin,
} from "../../services/user.service";
import { userActions } from "../actions";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* fetchMe(params: IparamSaga) {
  yield fetchListSagaCommon(
    getMeInfo,
    userActions.GET_ME_SUCCESS,
    "Get me",
    params
  );
}

function* fetchListUsers(params: IparamSaga) {
  yield fetchListSagaCommon(
    getUserList,
    userActions.GET_LIST_USER_SUCCESS,
    "Get list users",
    params
  );
}

function* updateUserInfo(params: IparamSaga) {
  yield updateSagaCommon(updateUser, params, "Update user info");
}

function* updateUserProfile(params: IparamSaga) {
  yield updateSagaCommon(updateProfile, params, "Update user profile");
}

function* addNewUser(params: IparamSaga) {
  yield addSagaCommon(addUser, params, "Add user");
}

function* importMultiUsers(params: IparamSaga) {
  yield addSagaCommon(importUser, params, "Import user");
}

function* removeUser(params: IparamSaga) {
  yield removeSagaCommon(deleteUser, params, "Delete user");
}

function* fetchAdmins(params: IparamSaga) {
  yield fetchListSagaCommon(
    getListAdmin,
    userActions.GET_LIST_ADMIN_SUCCESS,
    "Get admin list",
    params
  );
}

function* UserSaga() {
  yield takeLatest<ItakeLatestSaga>(userActions.GET_LIST_USER, fetchListUsers);
  yield takeLatest<ItakeLatestSaga>(
    userActions.UPDATE_USER_INFO,
    updateUserInfo
  );
  yield takeLatest<ItakeLatestSaga>(
    userActions.UPDATE_USER_PROFILE,
    updateUserProfile
  );
  yield takeLatest<ItakeLatestSaga>(userActions.ADD_USER, addNewUser);
  yield takeLatest<ItakeLatestSaga>(userActions.IMPORT_USER, importMultiUsers);
  yield takeLatest<ItakeLatestSaga>(userActions.DELETE_USER, removeUser);
  yield takeLatest<ItakeLatestSaga>(userActions.GET_ME, fetchMe);
  yield takeLatest<ItakeLatestSaga>(userActions.GET_LIST_ADMIN, fetchAdmins);
}

export default UserSaga;
