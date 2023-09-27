/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createFaculty,
  createMajor,
  getFaculties,
  getMajors,
  updateFaculty,
  updateMajor,
} from "../../services/faculty.service";
import { IparamSaga, IresponseAxios } from "../../interfaces/common.interface";
import { facultyActions } from "../actions";

function* addFaculty(params: IparamSaga): Generator<any> {
  try {
    const { payload } = params;
    const res: IresponseAxios | any = yield call(createFaculty, payload);
    NotificationManager.success(res?.data?.message, "Add faculty", 4000);
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Add faculty",
      4000
    );
  }
}

function* addMajor(params: IparamSaga): Generator<any> {
  try {
    const { payload } = params;
    const res: IresponseAxios | any = yield call(createMajor, payload);
    NotificationManager.success(res?.data?.message, "Add major", 4000);
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Add major",
      4000
    );
  }
}

function* editFaculty(params: IparamSaga): Generator<any> {
  try {
    const { id, payload } = params;
    const res: IresponseAxios | any = yield call(updateFaculty, id, payload);
    NotificationManager.success(res?.data?.message, "Update faculty", 4000);
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update faculty",
      4000
    );
  }
}

function* editMajor(params: IparamSaga): Generator<any> {
  try {
    const { id, payload } = params;
    const res: IresponseAxios | any = yield call(updateMajor, id, payload);
    NotificationManager.success(res?.data?.message, "Update major", 4000);
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update major",
      4000
    );
  }
}

function* fetchFaculties(params: IparamSaga): Generator<any> {
  try {
    const { payload } = params;
    const res: IresponseAxios | any = yield call(getFaculties, payload);
    yield put({
      type: facultyActions.GET_LIST_FACULTY_SUCCESS,
      action: res?.data?.data,
    });
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get faculties",
      4000
    );
  }
}

function* fetchMajors(params: IparamSaga): Generator<any> {
  try {
    const { payload } = params;
    const res: IresponseAxios | any = yield call(getMajors, payload);
    yield put({
      type: facultyActions.GET_LIST_MAJOR_SUCCESS,
      action: res?.data?.data,
    });
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get major",
      4000
    );
  }
}

function* FacultySaga() {
  // @ts-ignore
  yield takeLatest(facultyActions.ADD_FACULTY, addFaculty);
  // @ts-ignore
  yield takeLatest(facultyActions.ADD_MAJOR, addMajor);
  // @ts-ignore
  yield takeLatest(facultyActions.UPDATE_FACULTY, editFaculty);
  // @ts-ignore
  yield takeLatest(facultyActions.UPDATE_MAJOR, editMajor);
  // @ts-ignore
  yield takeLatest(facultyActions.GET_LIST_FACULTY, fetchFaculties);
  // @ts-ignore
  yield takeLatest(facultyActions.GET_LIST_MAJOR, fetchMajors);
}

export default FacultySaga;
