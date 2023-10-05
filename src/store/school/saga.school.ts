import { takeLatest } from "redux-saga/effects";
import { updateSchool, getSchool } from "../../services/school.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { fetchListSagaCommon, updateSagaCommon } from "../common";
import { schoolActions } from "../actions";

function* editSchool(params: IparamSaga) {
  yield updateSagaCommon(updateSchool, params, "Update school");
}

function* fetchShool(params: IparamSaga) {
  yield fetchListSagaCommon(
    getSchool,
    schoolActions.GET_SCHOOL_SUCCESS,
    "Get school info",
    params
  );
}

function* SchoolSaga() {
  yield takeLatest<ItakeLatestSaga>(schoolActions.GET_SCHOOL, fetchShool);
  yield takeLatest<ItakeLatestSaga>(schoolActions.UPDATE_SCHOOL, editSchool);
}

export default SchoolSaga;
