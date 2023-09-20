/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getMeInfo,
  getUserList,
  updateProfile,
  updateUser,
} from "../../services/user.service";
import { userActions } from "../actions";
import { IparamSaga, IresponseAxios } from "../../interfaces/common.interface";

function* fetchMe(): Generator<any> {
  try {
    const res: IresponseAxios | any = yield call(getMeInfo);
    yield put({
      type: userActions.GET_ME_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error: any) {
    NotificationManager.error(error?.response?.data?.message, "Get me", 4000);
  }
}

function* fetchListUsers(params: IparamSaga): Generator<any> {
  try {
    const { payload } = params;
    const res: IresponseAxios | any = yield call(getUserList, payload);
    yield put({
      type: userActions.GET_LIST_USER_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get list users",
      4000
    );
  }
}

function* updateUserInfo(params: IparamSaga): Generator<any> {
  try {
    const { payload, id } = params;
    const res: IresponseAxios | any = yield call(updateUser, id, payload);
    NotificationManager.success(
      res?.response?.data?.message,
      "Update user",
      4000
    );
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update user info",
      4000
    );
  }
}

function* updateUserProfile(params: IparamSaga): Generator<any> {
  try {
    const { payload, id } = params;
    const res: IresponseAxios | any = yield call(updateProfile, id, payload);
    NotificationManager.success(
      res?.response?.data?.message,
      "Update user profile",
      4000
    );
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update user profile",
      4000
    );
  }
}

function* UserSaga() {
  // @ts-ignore
  yield takeLatest(userActions.GET_LIST_USER, fetchListUsers);
  yield takeLatest(userActions.GET_ME, fetchMe);
  // @ts-ignore
  yield takeLatest(userActions.UPDATE_USER_INFO, updateUserInfo);
  // @ts-ignore
  yield takeLatest(userActions.UPDATE_USER_PROFILE, updateUserProfile);
}

export default UserSaga;
