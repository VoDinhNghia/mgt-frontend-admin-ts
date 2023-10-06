import { takeLatest } from "redux-saga/effects";
import {
  createDepartment,
  updateDepartment,
  createDepartmentMultiStaff,
  createDepartmentsStaff,
  updateDepartmentStaff,
  deleteDepartmentStaff,
  getDepartments,
} from "../../services/department.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { departmentActions } from "../actions";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addDepartment(params: IparamSaga) {
  yield addSagaCommon(createDepartment, params, "Add department");
}

function* addMultiStaffDepartment(params: IparamSaga) {
  yield addSagaCommon(
    createDepartmentMultiStaff,
    params,
    "Add multi staff department"
  );
}

function* addStaffDepartment(params: IparamSaga) {
  yield addSagaCommon(createDepartmentsStaff, params, "Add staff department");
}

function* editDepartment(params: IparamSaga) {
  yield updateSagaCommon(updateDepartment, params, "Update department");
}

function* editStaffDepartment(params: IparamSaga) {
  yield updateSagaCommon(
    updateDepartmentStaff,
    params,
    "Update staff department"
  );
}

function* removeDepartmentStaff(params: IparamSaga) {
  yield removeSagaCommon(
    deleteDepartmentStaff,
    params,
    "Delete staff department"
  );
}

function* fetchDepartments(params: IparamSaga) {
  yield fetchListSagaCommon(
    getDepartments,
    departmentActions.GET_LIST_DEPARTMENT_SUCCESS,
    "Get list department",
    params
  );
}

function* DepartmentSaga() {
  yield takeLatest<ItakeLatestSaga>(
    departmentActions.ADD_DEPARTMENT,
    addDepartment
  );
  yield takeLatest<ItakeLatestSaga>(
    departmentActions.ADD_DEPARTMENT_MULTI_STAFF,
    addMultiStaffDepartment
  );
  yield takeLatest<ItakeLatestSaga>(
    departmentActions.ADD_DEPARTMENT_STAFF,
    addStaffDepartment
  );
  yield takeLatest<ItakeLatestSaga>(
    departmentActions.UPDATE_DEPARTMENT,
    editDepartment
  );
  yield takeLatest<ItakeLatestSaga>(
    departmentActions.UPDATE_DEPARTMENT_STAFF,
    editStaffDepartment
  );
  yield takeLatest<ItakeLatestSaga>(
    departmentActions.DELETE_DEPARTMENT_STAFF,
    removeDepartmentStaff
  );
  yield takeLatest<ItakeLatestSaga>(
    departmentActions.GET_LIST_DEPARTMENT,
    fetchDepartments
  );
}

export default DepartmentSaga;
