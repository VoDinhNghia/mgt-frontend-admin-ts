import { takeLatest } from "redux-saga/effects";
import {
  createClass,
  createSubject,
  updateClass,
  updateSubject,
  deleteClass,
  deleteSubject,
  getClasses,
  getSubjects,
} from "../../services/class-subject.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { classSubjectActions } from "../actions";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addClass(params: IparamSaga) {
  yield addSagaCommon(createClass, params, "Add class");
}

function* addSubject(params: IparamSaga) {
  yield addSagaCommon(createSubject, params, "Add subject");
}

function* editClass(params: IparamSaga) {
  yield updateSagaCommon(updateClass, params, "Update class");
}

function* editSubject(params: IparamSaga) {
  yield updateSagaCommon(updateSubject, params, "Update subject");
}

function* removeClass(params: IparamSaga) {
  yield removeSagaCommon(deleteClass, params, "Delete class");
}

function* removeSubject(params: IparamSaga) {
  yield removeSagaCommon(deleteSubject, params, "Delete subject");
}

function* fetchClasses(params: IparamSaga) {
  yield fetchListSagaCommon(
    getClasses,
    classSubjectActions.GET_LIST_CLASS_SUCCESS,
    "Get classes",
    params
  );
}

function* fetchSubjects(params: IparamSaga) {
  yield fetchListSagaCommon(
    getSubjects,
    classSubjectActions.GET_LIST_SUBJECT_SUCCESS,
    "Get subjects",
    params
  );
}

function* ClassSubjectSaga() {
  yield takeLatest<ItakeLatestSaga>(classSubjectActions.ADD_CLASS, addClass);
  yield takeLatest<ItakeLatestSaga>(
    classSubjectActions.ADD_SUBJECT,
    addSubject
  );
  yield takeLatest<ItakeLatestSaga>(
    classSubjectActions.UPDATE_CLASS,
    editClass
  );
  yield takeLatest<ItakeLatestSaga>(
    classSubjectActions.UPDATE_SUBJECT,
    editSubject
  );
  yield takeLatest<ItakeLatestSaga>(
    classSubjectActions.DELETE_CLASS,
    removeClass
  );
  yield takeLatest<ItakeLatestSaga>(
    classSubjectActions.DELETE_SUBJECT,
    removeSubject
  );
  yield takeLatest<ItakeLatestSaga>(
    classSubjectActions.GET_LIST_CLASS,
    fetchClasses
  );
  yield takeLatest<ItakeLatestSaga>(
    classSubjectActions.GET_LIST_SUBJECT,
    fetchSubjects
  );
}

export default ClassSubjectSaga;
