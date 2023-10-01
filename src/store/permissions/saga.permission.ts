/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import { call, takeLatest } from "redux-saga/effects";
import {
  createPermission,
  deletePermission,
} from "../../services/permission.service";
import { permissionActions } from "../actions";
import {
  IparamSaga,
  IresponseAxios,
  IreturnTypeSaga,
  ItakeLatestSaga,
} from "../../interfaces/common.interface";
import { AxiosError } from "axios";

function* addNewPermission(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { payload } = params;
    const res: IresponseAxios = yield call(createPermission, payload);
    NotificationManager.success(res?.data?.message, "Add permission", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Add permission",
        4000
      );
    }
  }
}

function* removePermission(params: IparamSaga): ReturnType<IreturnTypeSaga> {
  try {
    const { id } = params;
    const res: IresponseAxios = yield call(deletePermission, id);
    NotificationManager.success(res?.data?.message, "Delete permission", 4000);
  } catch (error) {
    if (error instanceof AxiosError) {
      NotificationManager.error(
        error?.response?.data?.message,
        "Delete permission",
        4000
      );
    }
  }
}

function* PermissionSaga() {
  yield takeLatest<ItakeLatestSaga>(
    permissionActions.ADD_PERMISSION,
    addNewPermission
  );
  yield takeLatest<ItakeLatestSaga>(
    permissionActions.DELETE_PERMISSION,
    removePermission
  );
}

export default PermissionSaga;
