import { takeLatest } from "redux-saga/effects";
import {
  createPermission,
  deletePermission,
} from "../../services/permission.service";
import { permissionActions } from "../actions";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { addSagaCommon, removeSagaCommon } from "../common";

function* addNewPermission(params: IparamSaga) {
  yield addSagaCommon(createPermission, params, "Add permission");
}

function* removePermission(params: IparamSaga) {
  yield removeSagaCommon(deletePermission, params, "Delete permission");
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
