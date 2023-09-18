/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { getMeInfo, getUserList } from "../../services/user.service";
import { userActions } from "../actions";
import {
  IparamSaga,
  IparamsFetchList,
  IresponseAxios,
} from "../../interfaces/common.interface";

function* fetchMe(): Generator<any> {
  try {
    const res: IresponseAxios | any = yield call(getMeInfo);
    yield put({
      type: userActions.GET_ME_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchListUsers(params: IparamSaga): Generator<any> {
  try {
    const payload: IparamsFetchList | any = params?.payload;
    const res: IresponseAxios | any = yield call(getUserList, payload);
    yield put({
      type: userActions.GET_LIST_USER_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* UserSaga() {
  // @ts-ignore
  yield takeLatest(userActions.GET_LIST_USER, fetchListUsers);
  yield takeLatest(userActions.GET_ME, fetchMe);
}

export default UserSaga;
