/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createLearningRate,
  getLearningRate,
  updateLearningRate,
  deleteLearningRate,
  createMoneyCredit,
  getMoneyCredit,
  updateMoneyCredit,
  createSubjectPass,
  getSubjectPass,
  updateSubjectPass,
  deleteSubjectPass,
} from "../../services/setting.service";
import {
  IparamSaga,
  IresponseAxios,
  IreturnTypeSaga,
  ItakeLatestSaga,
} from "../../interfaces/common.interface";
import { AxiosError } from "axios";
import { settingActions } from "../actions";

function* addLearningRate(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  const titleNotify = "Add learning rate";
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(createLearningRate, payload);
    NotificationManager.success(res?.data?.message, titleNotify, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        titleNotify,
        4000
      );
    }
  }
}

function* fetchLearningRate(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(getLearningRate, payload);
    yield put({
      type: settingActions.GET_LIST_LEARNING_RATE_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Get lerning rate",
        4000
      );
    }
  }
}

function* editLearningRate(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  const titleNotify = "Update learning rate";
  try {
    const { id, payload } = params;
    const res: IresponseAxios = yield call(updateLearningRate, id, payload);
    NotificationManager.success(res?.data?.message, titleNotify, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        titleNotify,
        4000
      );
    }
  }
}

function* removeLearningRate(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  const titleNotify = "Delete learning rate";
  try {
    const { id } = params;
    const res: IresponseAxios = yield call(deleteLearningRate, id);
    NotificationManager.success(res?.data?.message, titleNotify, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        titleNotify,
        4000
      );
    }
  }
}

function* addSubjectPass(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  const titleNotify = "Add subject pass";
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(createSubjectPass, payload);
    NotificationManager.success(res?.data?.message, titleNotify, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        titleNotify,
        4000
      );
    }
  }
}

function* fetchSubjectPass(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(getSubjectPass, payload);
    yield put({
      type: settingActions.GET_LIST_SUBJECT_PASS_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Get subject pass",
        4000
      );
    }
  }
}

function* editSubjectPass(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  const titleNotify = "Update subject pass";
  try {
    const { id, payload } = params;
    const res: IresponseAxios = yield call(updateSubjectPass, id, payload);
    NotificationManager.success(res?.data?.message, titleNotify, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        titleNotify,
        4000
      );
    }
  }
}

function* removeSubjectPass(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  const titleNotify = "Delete subject pass";
  try {
    const { id } = params;
    const res: IresponseAxios = yield call(deleteSubjectPass, id);
    NotificationManager.success(res?.data?.message, titleNotify, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        titleNotify,
        4000
      );
    }
  }
}

function* addMoneyCredit(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  const titleNotify = "Add money credit";
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(createMoneyCredit, payload);
    NotificationManager.success(res?.data?.message, titleNotify, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        titleNotify,
        4000
      );
    }
  }
}

function* fetchMoneyCredit(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(getMoneyCredit, payload);
    yield put({
      type: settingActions.GET_LIST_MONEY_CREDIT_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Get subject pass",
        4000
      );
    }
  }
}

function* editMoneyCredit(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  const titleNotify = "Update money credit";
  try {
    const { id, payload } = params;
    const res: IresponseAxios = yield call(updateMoneyCredit, id, payload);
    NotificationManager.success(res?.data?.message, titleNotify, 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        titleNotify,
        4000
      );
    }
  }
}

function* SettingSaga() {
  yield takeLatest<ItakeLatestSaga>(
    settingActions.GET_LIST_LEARNING_RATE,
    fetchLearningRate
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.ADD_LEARNING_RATE,
    addLearningRate
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.UPDATE_LEARNING_RATE,
    editLearningRate
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.DELETE_LEARNING_RATE,
    removeLearningRate
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.ADD_SUBJECT_PASS,
    addSubjectPass
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.UPDATE_SUBJECT_PASS,
    editSubjectPass
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.DELETE_SUBJECT_PASS,
    removeSubjectPass
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.GET_LIST_SUBJECT_PASS,
    fetchSubjectPass
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.ADD_MONEY_CREDIT,
    addMoneyCredit
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.UPDATE_MONEY_CREDIT,
    editMoneyCredit
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.GET_LIST_MONEY_CREDIT,
    fetchMoneyCredit
  );
}

export default SettingSaga;
