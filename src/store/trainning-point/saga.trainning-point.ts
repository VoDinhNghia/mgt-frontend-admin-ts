import { takeLatest } from "redux-saga/effects";
import {
  createTrainingPoint,
  createVoluntee,
  importTrainningPoint,
  importVoluntee,
  updateTrainningPoint,
  updateVoluntee,
  deleteTrainningPoint,
  deleteVoluntee,
  getTrainningPoints,
  getVoluntees,
} from "../../services/trainning-point.service";
import { trainningPointActions } from "../actions";
import {
  addSagaCommon,
  updateSagaCommon,
  removeSagaCommon,
  fetchListSagaCommon,
} from "../common";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";

function* addTrainningPoint(params: IparamSaga) {
  yield addSagaCommon(createTrainingPoint, params, "Add trainning point");
}

function* addVoluntee(params: IparamSaga) {
  yield addSagaCommon(createVoluntee, params, "Add voluntee");
}

function* importMultiTrainningPoint(params: IparamSaga) {
  yield addSagaCommon(importTrainningPoint, params, "Import trainning point");
}

function* importMultiVoluntee(params: IparamSaga) {
  yield addSagaCommon(importVoluntee, params, "Import voluntee");
}

function* editTrainningPoint(params: IparamSaga) {
  yield updateSagaCommon(
    updateTrainningPoint,
    params,
    "Update trainning point"
  );
}

function* editVoluntee(params: IparamSaga) {
  yield updateSagaCommon(updateVoluntee, params, "Update voluntee");
}

function* removeTrainningPoint(params: IparamSaga) {
  yield removeSagaCommon(
    deleteTrainningPoint,
    params,
    "Delete trainning point"
  );
}

function* removeVoluntee(params: IparamSaga) {
  yield removeSagaCommon(deleteVoluntee, params, "Delete voluntee");
}

function* fetchTrainningPoints(params: IparamSaga) {
  yield fetchListSagaCommon(
    getTrainningPoints,
    trainningPointActions.GET_LIST_TRAINNING_POINT_SUCCESS,
    "Get list trainning point",
    params
  );
}

function* fetchVoluntees(params: IparamSaga) {
  yield fetchListSagaCommon(
    getVoluntees,
    trainningPointActions.GET_LIST_VOLUNTEE_SUCCESS,
    "Get list voluntee",
    params
  );
}

function* TrainningPointSaga() {
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.ADD_TRAINNING_POINT,
    addTrainningPoint
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.ADD_VOLUNTEE,
    addVoluntee
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.IMPORT_TRAINNING_POINT,
    importMultiTrainningPoint
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.IMPORT_VOLUNTEE,
    importMultiVoluntee
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.UPDATE_TRAINNING_POINT,
    editTrainningPoint
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.UPDATE_VOLUNTEE,
    editVoluntee
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.DELETE_TRAINNING_POINT,
    removeTrainningPoint
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.DELETE_VOLUNTEE,
    removeVoluntee
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.GET_LIST_TRAINNING_POINT,
    fetchTrainningPoints
  );
  yield takeLatest<ItakeLatestSaga>(
    trainningPointActions.GET_LIST_VOLUNTEE,
    fetchVoluntees
  );
}

export default TrainningPointSaga;
