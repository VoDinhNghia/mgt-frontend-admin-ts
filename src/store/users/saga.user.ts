/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
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
import {
  IparamSaga,
  IresponseAxios,
  IreturnTypeSaga,
  ItakeLatestSaga,
} from "../../interfaces/common.interface";

function* fetchMe(): ReturnType<IreturnTypeSaga> {
  try {
    const res: IresponseAxios = yield call(getMeInfo);
    yield put({
      type: userActions.GET_ME_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(error?.response?.data?.message, "Get me", 4000);
    }
  }
}

function* fetchListUsers(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(getUserList, payload);
    yield put({
      type: userActions.GET_LIST_USER_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Get list users",
        4000
      );
    }
  }
}

function* updateUserInfo(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload, id } = params;
    const res: IresponseAxios = yield call(updateUser, id, payload);
    NotificationManager.success(res?.data?.message, "Update user", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Update user info",
        4000
      );
    }
  }
}

function* updateUserProfile(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload, id } = params;
    const res: IresponseAxios = yield call(updateProfile, id, payload);
    NotificationManager.success(
      res?.data?.message,
      "Update user profile",
      4000
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Update user profile",
        4000
      );
    }
  }
}

function* addNewUser(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(addUser, payload);
    NotificationManager.success(res?.data?.message, "Add user", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Add user",
        4000
      );
    }
  }
}

function* importMultiUsers(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(importUser, payload);
    NotificationManager.success(res?.data?.message, "Import User", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Import user",
        4000
      );
    }
  }
}

function* removeUser(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { id } = params;
    const res: IresponseAxios = yield call(deleteUser, id);
    NotificationManager.success(res?.data?.message, "Delete user", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Delete user",
        4000
      );
    }
  }
}

function* fetchAdmins(): ReturnType<IreturnTypeSaga> {
  try {
    const res: IresponseAxios = yield call(getListAdmin);
    yield put({
      type: userActions.GET_LIST_ADMIN_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Get admin list",
        4000
      );
    }
  }
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
