import { takeLatest } from "redux-saga/effects";
import {
  createDegreelevel,
  updateDegreelevel,
  deleteDegreelevel,
  getDegreelevels,
} from "../../services/degreelevel.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { degreelevelActions } from "../actions";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addDegreelevel(params: IparamSaga) {
  yield addSagaCommon(createDegreelevel, params, "Add degreelevel");
}

function* editDegreelevel(params: IparamSaga) {
  yield updateSagaCommon(updateDegreelevel, params, "Update degreelevel");
}

function* removeDegreelevel(params: IparamSaga) {
  yield removeSagaCommon(deleteDegreelevel, params, "Delete degreelevel");
}

function* fetchDegreelevels(params: IparamSaga) {
  yield fetchListSagaCommon(
    getDegreelevels,
    degreelevelActions.GET_LIST_DEGREELEVEL_SUCCESS,
    "Get list degrelevels",
    params
  );
}

function* DegreelevelSaga() {
  yield takeLatest<ItakeLatestSaga>(
    degreelevelActions.ADD_DEGREELEVEL,
    addDegreelevel
  );
  yield takeLatest<ItakeLatestSaga>(
    degreelevelActions.UPDATE_DEGREELEVEL,
    editDegreelevel
  );
  yield takeLatest<ItakeLatestSaga>(
    degreelevelActions.DELETE_DEGREELEVEL,
    removeDegreelevel
  );
  yield takeLatest<ItakeLatestSaga>(
    degreelevelActions.GET_LIST_DEGREELEVEL,
    fetchDegreelevels
  );
}

export default DegreelevelSaga;
