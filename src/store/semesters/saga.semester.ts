import { takeLatest } from "redux-saga/effects";
import {
  createSemester,
  updateSemester,
  deleteSemester,
  getSemesters,
} from "../../services/semester.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";
import { semesterActions } from "../actions";

function* addSemester(params: IparamSaga) {
  yield addSagaCommon(createSemester, params, "Add semester");
}

function* editSemester(params: IparamSaga) {
  yield updateSagaCommon(updateSemester, params, "Update semester");
}

function* removeSemester(params: IparamSaga) {
  yield removeSagaCommon(deleteSemester, params, "Delete semester");
}

function* fetchSemesters(params: IparamSaga) {
  yield fetchListSagaCommon(
    getSemesters,
    semesterActions.GET_LIST_SEMESTER_SUCCESS,
    "Get list semester",
    params
  );
}

function* SemesterSaga() {
  yield takeLatest<ItakeLatestSaga>(semesterActions.ADD_SEMESTER, addSemester);
  yield takeLatest<ItakeLatestSaga>(
    semesterActions.DELETE_SEMESTER,
    removeSemester
  );
  yield takeLatest<ItakeLatestSaga>(
    semesterActions.UPDATE_SEMESTER,
    editSemester
  );
  yield takeLatest<ItakeLatestSaga>(
    semesterActions.GET_LIST_SEMESTER,
    fetchSemesters
  );
}

export default SemesterSaga;
