import { takeLatest } from "redux-saga/effects";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";
import {
  createInstitutes,
  updateInstitutes,
  deleteInstitutes,
  getInstitutes,
} from "../../services/institutes.service";
import { institutesActions } from "../actions";

function* addInstitutes(params: IparamSaga) {
  yield addSagaCommon(createInstitutes, params, "Add institutes");
}

function* editInstitutes(params: IparamSaga) {
  yield updateSagaCommon(updateInstitutes, params, "Update institutes");
}

function* removeInstitutes(params: IparamSaga) {
  yield removeSagaCommon(deleteInstitutes, params, "Delete institutes");
}

function* fetchInstitutes(params: IparamSaga) {
  yield fetchListSagaCommon(
    getInstitutes,
    institutesActions.GET_LIST_INSTITUTES_SUCCESS,
    "Get list institutes",
    params
  );
}

function* InstitutesSaga() {
  yield takeLatest<ItakeLatestSaga>(
    institutesActions.ADD_INSTITUTES,
    addInstitutes
  );
  yield takeLatest<ItakeLatestSaga>(
    institutesActions.UPDATE_INSTITUTES,
    editInstitutes
  );
  yield takeLatest<ItakeLatestSaga>(
    institutesActions.DELETE_INSTITUTES,
    removeInstitutes
  );
  yield takeLatest<ItakeLatestSaga>(
    institutesActions.GET_LIST_INSTITUTES,
    fetchInstitutes
  );
}

export default InstitutesSaga;
