import { takeLatest } from "redux-saga/effects";
import {
  createScholarship,
  createUserScholarship,
  updateScholarship,
  getScholarships,
  getUserScholarships,
  deleteScholarship,
  deleteUserScholarship,
} from "../../services/scholarship.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { scholarshipActions } from "../actions";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addCreateScholarship(params: IparamSaga) {
  yield addSagaCommon(createScholarship, params, "Add scholarship");
}

function* addCreateUserScholarship(params: IparamSaga) {
  yield addSagaCommon(createUserScholarship, params, "Add user scholarship");
}

function* editScholarship(params: IparamSaga) {
  yield updateSagaCommon(updateScholarship, params, "Update scholarship");
}

function* removeScholarship(params: IparamSaga) {
  yield removeSagaCommon(deleteScholarship, params, "Delete scholarship");
}

function* removeUserScholarship(params: IparamSaga) {
  yield removeSagaCommon(
    deleteUserScholarship,
    params,
    "Delete user scholarship"
  );
}

function* fetchScholarship(params: IparamSaga) {
  yield fetchListSagaCommon(
    getScholarships,
    scholarshipActions.GET_LIST_SCHOLARSHIP_SUCCESS,
    "Get list scholarship",
    params
  );
}

function* fetchUserScholarship(params: IparamSaga) {
  yield fetchListSagaCommon(
    getUserScholarships,
    scholarshipActions.GET_LIST_USER_SCHOLARSHIP_SUCCESS,
    "Get list user scholarship",
    params
  );
}

function* ScholarshipSaga() {
  yield takeLatest<ItakeLatestSaga>(
    scholarshipActions.ADD_SCHOLARSHIP,
    addCreateScholarship
  );
  yield takeLatest<ItakeLatestSaga>(
    scholarshipActions.ADD_USER_SCHOLARSHIP,
    addCreateUserScholarship
  );
  yield takeLatest<ItakeLatestSaga>(
    scholarshipActions.UPDATE_SCHOLARSHIP,
    editScholarship
  );
  yield takeLatest<ItakeLatestSaga>(
    scholarshipActions.DELETE_SCHOLARSHIP,
    removeScholarship
  );
  yield takeLatest<ItakeLatestSaga>(
    scholarshipActions.DELETE_USER_SCHOLARSHIP,
    removeUserScholarship
  );
  yield takeLatest<ItakeLatestSaga>(
    scholarshipActions.GET_LIST_SCHOLARSHIP,
    fetchScholarship
  );
  yield takeLatest<ItakeLatestSaga>(
    scholarshipActions.GET_LIST_USER_SCHOLARSHIP_SUCCESS,
    fetchUserScholarship
  );
}

export default ScholarshipSaga;
