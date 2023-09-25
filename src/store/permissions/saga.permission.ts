/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import { call, takeLatest } from "redux-saga/effects";
import {
  createPermission,
  deletePermission,
} from "../../services/permission.service";
import { permissionActions } from "../actions";
import { IparamSaga, IresponseAxios } from "../../interfaces/common.interface";

function* addNewPermission(params: IparamSaga): Generator<any> {
  try {
    const { payload } = params;
    const res: IresponseAxios | any = yield call(createPermission, payload);
    NotificationManager.success(res?.data?.message, "Add permission", 4000);
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Add permission",
      4000
    );
  }
}

function* removePermission(params: IparamSaga): Generator<any> {
  try {
    const { id } = params;
    const res: IresponseAxios | any = yield call(deletePermission, id);
    NotificationManager.success(res?.data?.message, "Delete permission", 4000);
  } catch (error: any) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete permission",
      4000
    );
  }
}

function* PermissionSaga() {
  // @ts-ignore
  yield takeLatest(permissionActions.ADD_PERMISSION, addNewPermission);
  // @ts-ignore
  yield takeLatest(permissionActions.DELETE_PERMISSION, removePermission);
}

export default PermissionSaga;
