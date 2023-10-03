import { takeLatest } from "redux-saga/effects";
import {
  createFaculty,
  createMajor,
  getFaculties,
  getMajors,
  updateFaculty,
  updateMajor,
  deleteFaculty,
  deleteMajor,
} from "../../services/faculty.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { facultyActions } from "../actions";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addFaculty(params: IparamSaga) {
  yield addSagaCommon(createFaculty, params, "Add faculty");
}

function* addMajor(params: IparamSaga) {
  yield addSagaCommon(createMajor, params, "Add major");
}

function* editFaculty(params: IparamSaga) {
  yield updateSagaCommon(updateFaculty, params, "Update faculty");
}

function* editMajor(params: IparamSaga) {
  yield updateSagaCommon(updateMajor, params, "Update major");
}

function* fetchFaculties(params: IparamSaga) {
  yield fetchListSagaCommon(
    getFaculties,
    facultyActions.GET_LIST_FACULTY_SUCCESS,
    "Get list faculties",
    params
  );
}

function* fetchMajors(params: IparamSaga) {
  yield fetchListSagaCommon(
    getMajors,
    facultyActions.GET_LIST_MAJOR_SUCCESS,
    "Get list majors",
    params
  );
}

function* removeFaculty(params: IparamSaga) {
  yield removeSagaCommon(deleteFaculty, params, "Delete faculty");
}

function* removeMajor(params: IparamSaga) {
  yield removeSagaCommon(deleteMajor, params, "Delete major");
}

function* FacultySaga() {
  yield takeLatest<ItakeLatestSaga>(facultyActions.ADD_FACULTY, addFaculty);
  yield takeLatest<ItakeLatestSaga>(facultyActions.ADD_MAJOR, addMajor);
  yield takeLatest<ItakeLatestSaga>(facultyActions.UPDATE_FACULTY, editFaculty);
  yield takeLatest<ItakeLatestSaga>(facultyActions.UPDATE_MAJOR, editMajor);
  yield takeLatest<ItakeLatestSaga>(
    facultyActions.GET_LIST_FACULTY,
    fetchFaculties
  );
  yield takeLatest<ItakeLatestSaga>(facultyActions.GET_LIST_MAJOR, fetchMajors);
  yield takeLatest<ItakeLatestSaga>(
    facultyActions.DELETE_FACULTY,
    removeFaculty
  );
  yield takeLatest<ItakeLatestSaga>(facultyActions.DELETE_MAJOR, removeMajor);
}

export default FacultySaga;
