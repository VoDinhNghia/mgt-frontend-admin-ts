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
import {
  IparamSaga,
  IresponseAxios,
  IreturnTypeSaga,
  ItakeLatestSaga,
} from "../../interfaces/common.interface";
import { facultyActions } from "../actions";
import { AxiosError } from "axios";

function* addFaculty(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(createFaculty, payload);
    NotificationManager.success(res?.data?.message, "Add faculty", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Add faculty",
        4000
      );
    }
  }
}

function* addMajor(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(createMajor, payload);
    NotificationManager.success(res?.data?.message, "Add major", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Add major",
        4000
      );
    }
  }
}

function* editFaculty(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { id, payload } = params;
    const res: IresponseAxios = yield call(updateFaculty, id, payload);
    NotificationManager.success(res?.data?.message, "Update faculty", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Update faculty",
        4000
      );
    }
  }
}

function* editMajor(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { id, payload } = params;
    const res: IresponseAxios = yield call(updateMajor, id, payload);
    NotificationManager.success(res?.data?.message, "Update major", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Update major",
        4000
      );
    }
  }
}

function* fetchFaculties(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(getFaculties, payload);
    yield put({
      type: facultyActions.GET_LIST_FACULTY_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Get faculties",
        4000
      );
    }
  }
}

function* fetchMajors(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(getMajors, payload);
    yield put({
      type: facultyActions.GET_LIST_MAJOR_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Get major",
        4000
      );
    }
  }
}

function* FacultySaga() {
  yield takeLatest<ItakeLatestSaga>(facultyActions.ADD_FACULTY, addFaculty);
  yield takeLatest<ItakeLatestSaga>(facultyActions.ADD_MAJOR, addMajor);
  yield takeLatest<ItakeLatestSaga>(facultyActions.UPDATE_FACULTY, editFaculty);
  yield takeLatest<ItakeLatestSaga>(facultyActions.UPDATE_MAJOR, editMajor);
  yield takeLatest<ItakeLatestSaga>(
    facultyActions.GET_LIST_FACULTY,
    fetchFaculties
  );
  yield takeLatest<ItakeLatestSaga>(facultyActions.GET_LIST_MAJOR, fetchMajors);
}

export default FacultySaga;
