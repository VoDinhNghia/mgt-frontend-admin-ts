/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import {
  IparamSaga,
  IresponseAxios,
  IreturnTypeSaga,
} from "../interfaces/common.interface";
import { call, put } from "redux-saga/effects";
import { AxiosError } from "axios";

export function* fetchListSagaCommon(
  fetchFunction: any,
  action: string,
  message: string,
  params: IparamSaga
): ReturnType<IreturnTypeSaga> {
  const { payload } = params;
  try {
    const res: IresponseAxios = yield call(fetchFunction, payload);
    yield put({
      type: action,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(error?.response?.data?.message, message, 4000);
    }
  }
}

export function* updateSagaCommon(
  updateFunction: any,
  params: IparamSaga,
  message: string
): ReturnType<IreturnTypeSaga> {
  try {
    const { payload, id } = params;
    const res: IresponseAxios = yield call(updateFunction, id, payload);
    NotificationManager.success(res?.data?.message, message, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(error?.response?.data?.message, message, 4000);
    }
  }
}

export function* addSagaCommon(
  addFunction: any,
  params: IparamSaga,
  message: string
): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(addFunction, payload);
    NotificationManager.success(res?.data?.message, message, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(error?.response?.data?.message, message, 4000);
    }
  }
}

export function* removeSagaCommon(
  removeFunction: any,
  params: IparamSaga,
  message: string
): ReturnType<IreturnTypeSaga> {
  try {
    const { id } = params;
    const res: IresponseAxios = yield call(removeFunction, id);
    NotificationManager.success(res?.data?.message, message, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(error?.response?.data?.message, message, 4000);
    }
  }
}
