import { takeLatest } from "redux-saga/effects";
import {
  createRegisterSubject,
  updateRegisterSubject,
  getStudents,
  getStudyProcess,
} from "../../services/study-process.service";
import { studyProcessActions } from "../actions";
import {
  addSagaCommon,
  updateSagaCommon,
  fetchListSagaCommon,
} from "../common";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";

function* addRegisterSubject(params: IparamSaga) {
  yield addSagaCommon(createRegisterSubject, params, "Add register subject");
}

function* editRegisterSubject(params: IparamSaga) {
  yield updateSagaCommon(
    updateRegisterSubject,
    params,
    "Update register subject"
  );
}

function* fetchStudyProcess(params: IparamSaga) {
  yield fetchListSagaCommon(
    getStudyProcess,
    studyProcessActions.GET_LIST_STUDY_PROCESS_SUCCESS,
    "Get list study process",
    params
  );
}

function* fetchStudents(params: IparamSaga) {
  yield fetchListSagaCommon(
    getStudents,
    studyProcessActions.GET_LIST_STUDY_PROCESS_STUDENTS_SUCCESS,
    "Get study process student",
    params
  );
}

function* StudyProcessSaga() {
  yield takeLatest<ItakeLatestSaga>(
    studyProcessActions.ADD_REGISTER_SUBJECT,
    addRegisterSubject
  );
  yield takeLatest<ItakeLatestSaga>(
    studyProcessActions.UPDATE_REGISTER_SUBJECT,
    editRegisterSubject
  );
  yield takeLatest<ItakeLatestSaga>(
    studyProcessActions.GET_LIST_STUDY_PROCESS,
    fetchStudyProcess
  );
  yield takeLatest<ItakeLatestSaga>(
    studyProcessActions.GET_LIST_STUDY_PROCESS_STUDENTS,
    fetchStudents
  );
}

export default StudyProcessSaga;
