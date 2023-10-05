import { takeLatest } from "redux-saga/effects";
import {
  createUnion,
  createUnionImage,
  createUnionMember,
  updateUnion,
  updateUnionImage,
  updateUnionMember,
  deleteUnion,
  deleteUnionImage,
  deleteUnionMember,
  getUnionImage,
  getUnionMember,
  getUnions,
} from "../../services/union.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { unionActions } from "../actions";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addUnion(params: IparamSaga) {
  yield addSagaCommon(createUnion, params, "Add union");
}

function* addUnionMember(params: IparamSaga) {
  yield addSagaCommon(createUnionMember, params, "Add union member");
}

function* addUnionImage(params: IparamSaga) {
  yield addSagaCommon(createUnionImage, params, "Add union image");
}

function* editUnion(params: IparamSaga) {
  yield updateSagaCommon(updateUnion, params, "Update union");
}

function* editUnionImage(params: IparamSaga) {
  yield updateSagaCommon(updateUnionImage, params, "Update union image");
}

function* editUnionMember(params: IparamSaga) {
  yield updateSagaCommon(updateUnionMember, params, "Update union member");
}

function* removeUnion(params: IparamSaga) {
  yield removeSagaCommon(deleteUnion, params, "Delete union");
}

function* removeUnionImage(params: IparamSaga) {
  yield removeSagaCommon(deleteUnionImage, params, "Delete union image");
}

function* removeUnionMember(params: IparamSaga) {
  yield removeSagaCommon(deleteUnionMember, params, "Delete union member");
}

function* fetchUnions(params: IparamSaga) {
  yield fetchListSagaCommon(
    getUnions,
    unionActions.GET_LIST_UNION_SUCCESS,
    "Get list unions",
    params
  );
}

function* fetchUnionImages(params: IparamSaga) {
  yield fetchListSagaCommon(
    getUnionImage,
    unionActions.GET_LIST_UNION_IMAGE_SUCCESS,
    "Get list union",
    params
  );
}

function* fetchUnionMembers(params: IparamSaga) {
  yield fetchListSagaCommon(
    getUnionMember,
    unionActions.GET_LIST_UNION_MEMBER_SUCCESS,
    "Get list union",
    params
  );
}

function* UnionSaga() {
  yield takeLatest<ItakeLatestSaga>(unionActions.ADD_UNION, addUnion);
  yield takeLatest<ItakeLatestSaga>(
    unionActions.ADD_UNION_IMAGE,
    addUnionImage
  );
  yield takeLatest<ItakeLatestSaga>(
    unionActions.ADD_UNION_MEMBER,
    addUnionMember
  );
  yield takeLatest<ItakeLatestSaga>(unionActions.UPDATE_UNION, editUnion);
  yield takeLatest<ItakeLatestSaga>(
    unionActions.UPDATE_UNION_IMAGE,
    editUnionImage
  );
  yield takeLatest<ItakeLatestSaga>(
    unionActions.UPDATE_UNION_MEMBER,
    editUnionMember
  );
  yield takeLatest<ItakeLatestSaga>(unionActions.DELETE_UNION, removeUnion);
  yield takeLatest<ItakeLatestSaga>(
    unionActions.DELETE_UNION_IMAGE,
    removeUnionImage
  );
  yield takeLatest<ItakeLatestSaga>(
    unionActions.DELETE_UNION_MEMBER,
    removeUnionMember
  );
  yield takeLatest<ItakeLatestSaga>(unionActions.GET_LIST_UNION, fetchUnions);
  yield takeLatest<ItakeLatestSaga>(
    unionActions.GET_LIST_UNION_IMAGE,
    fetchUnionImages
  );
  yield takeLatest<ItakeLatestSaga>(
    unionActions.GET_LIST_UNION_MEMBER,
    fetchUnionMembers
  );
}

export default UnionSaga;
