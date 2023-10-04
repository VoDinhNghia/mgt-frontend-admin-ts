import { takeLatest } from "redux-saga/effects";
import {
  createBranch,
  getBranch,
  updateBranch,
  deleteBranch,
} from "../../services/branch.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";
import { branchActions } from "../actions";

function* addBranch(params: IparamSaga) {
  yield addSagaCommon(createBranch, params, "Add branch");
}

function* editBranch(params: IparamSaga) {
  yield updateSagaCommon(updateBranch, params, "Update branch");
}

function* removeBranch(params: IparamSaga) {
  yield removeSagaCommon(deleteBranch, params, "Delete branch");
}

function* fetchBranch(params: IparamSaga) {
  yield fetchListSagaCommon(
    getBranch,
    branchActions.GET_LIST_BRANCH_SUCCESS,
    "Get list branch",
    params
  );
}

function* BranchSaga() {
  yield takeLatest<ItakeLatestSaga>(branchActions.ADD_BRANCH, addBranch);
  yield takeLatest<ItakeLatestSaga>(branchActions.UPDATE_BRANCH, editBranch);
  yield takeLatest<ItakeLatestSaga>(branchActions.DELETE_BRANCH, removeBranch);
  yield takeLatest<ItakeLatestSaga>(branchActions.GET_LIST_BRANCH, fetchBranch);
}

export default BranchSaga;
