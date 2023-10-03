import { takeLatest } from "redux-saga/effects";
import {
  createLearningRate,
  getLearningRate,
  updateLearningRate,
  deleteLearningRate,
  createMoneyCredit,
  getMoneyCredit,
  updateMoneyCredit,
  createSubjectPass,
  getSubjectPass,
  updateSubjectPass,
  deleteSubjectPass,
} from "../../services/setting.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { settingActions } from "../actions";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addLearningRate(params: IparamSaga) {
  const titleNotify = "Add learning rate";
  yield addSagaCommon(createLearningRate, params, titleNotify);
}

function* fetchLearningRate(params: IparamSaga) {
  yield fetchListSagaCommon(
    getLearningRate,
    settingActions.GET_LIST_LEARNING_RATE_SUCCESS,
    "Get list learning rate",
    params
  );
}

function* editLearningRate(params: IparamSaga) {
  const titleNotify = "Update learning rate";
  yield updateSagaCommon(updateLearningRate, params, titleNotify);
}

function* removeLearningRate(params: IparamSaga) {
  const titleNotify = "Delete learning rate";
  yield removeSagaCommon(deleteLearningRate, params, titleNotify);
}

function* addSubjectPass(params: IparamSaga) {
  const titleNotify = "Add subject pass";
  yield addSagaCommon(createSubjectPass, params, titleNotify);
}

function* fetchSubjectPass(params: IparamSaga) {
  yield fetchListSagaCommon(
    getSubjectPass,
    settingActions.GET_LIST_SUBJECT_PASS_SUCCESS,
    "Get list subject pass",
    params
  );
}

function* editSubjectPass(params: IparamSaga) {
  const titleNotify = "Update subject pass";
  yield updateSagaCommon(updateSubjectPass, params, titleNotify);
}

function* removeSubjectPass(params: IparamSaga) {
  const titleNotify = "Delete subject pass";
  yield removeSagaCommon(deleteSubjectPass, params, titleNotify);
}

function* addMoneyCredit(params: IparamSaga) {
  const titleNotify = "Add money credit";
  yield addSagaCommon(createMoneyCredit, params, titleNotify);
}

function* fetchMoneyCredit(params: IparamSaga) {
  yield fetchListSagaCommon(
    getMoneyCredit,
    settingActions.GET_LIST_MONEY_CREDIT_SUCCESS,
    "Get list money credit",
    params
  );
}

function* editMoneyCredit(params: IparamSaga) {
  const titleNotify = "Update money credit";
  yield updateSagaCommon(updateMoneyCredit, params, titleNotify);
}

function* SettingSaga() {
  yield takeLatest<ItakeLatestSaga>(
    settingActions.GET_LIST_LEARNING_RATE,
    fetchLearningRate
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.ADD_LEARNING_RATE,
    addLearningRate
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.UPDATE_LEARNING_RATE,
    editLearningRate
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.DELETE_LEARNING_RATE,
    removeLearningRate
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.ADD_SUBJECT_PASS,
    addSubjectPass
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.UPDATE_SUBJECT_PASS,
    editSubjectPass
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.DELETE_SUBJECT_PASS,
    removeSubjectPass
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.GET_LIST_SUBJECT_PASS,
    fetchSubjectPass
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.ADD_MONEY_CREDIT,
    addMoneyCredit
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.UPDATE_MONEY_CREDIT,
    editMoneyCredit
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.GET_LIST_MONEY_CREDIT,
    fetchMoneyCredit
  );
}

export default SettingSaga;
