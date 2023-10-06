import { takeLatest } from "redux-saga/effects";
import { centerActions } from "../actions";
import {
  createCenter,
  updateCenters,
  deleteCenters,
  getCenters,
} from "../../services/center.service";
import {
  addSagaCommon,
  updateSagaCommon,
  removeSagaCommon,
  fetchListSagaCommon,
} from "../common";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";

function* addCenter(params: IparamSaga) {
  yield addSagaCommon(createCenter, params, "Add center");
}

function* editCenter(params: IparamSaga) {
  yield updateSagaCommon(updateCenters, params, "Update center");
}

function* removeCenter(params: IparamSaga) {
  yield removeSagaCommon(deleteCenters, params, "Delete center");
}

function* fetchCenters(params: IparamSaga) {
  yield fetchListSagaCommon(
    getCenters,
    centerActions.GET_LIST_CENTER_SUCCESS,
    "Get list center",
    params
  );
}

function* CenterSaga() {
  yield takeLatest<ItakeLatestSaga>(centerActions.ADD_CENTER, addCenter);
  yield takeLatest<ItakeLatestSaga>(centerActions.UPDATE_CENTER, editCenter);
  yield takeLatest<ItakeLatestSaga>(centerActions.DELETE_CENTER, removeCenter);
  yield takeLatest<ItakeLatestSaga>(
    centerActions.GET_LIST_CENTER,
    fetchCenters
  );
}

export default CenterSaga;
