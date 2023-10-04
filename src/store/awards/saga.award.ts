import { takeLatest } from "redux-saga/effects";
import {
  createAward,
  getAwards,
  deleteAward,
  updateAward,
} from "../../services/award.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";
import { awardActions } from "../actions";

function* addAward(params: IparamSaga) {
  yield addSagaCommon(createAward, params, "Add award");
}

function* editAward(params: IparamSaga) {
  yield updateSagaCommon(updateAward, params, "Update award");
}

function* removeAward(params: IparamSaga) {
  yield removeSagaCommon(deleteAward, params, "Delete award");
}

function* fetchAwards(params: IparamSaga) {
  yield fetchListSagaCommon(
    getAwards,
    awardActions.GET_LIST_AWARD_SUCCESS,
    "Get list awards",
    params
  );
}

function* AwardSaga() {
  yield takeLatest<ItakeLatestSaga>(awardActions.GET_LIST_AWARD, fetchAwards);
  yield takeLatest<ItakeLatestSaga>(awardActions.ADD_AWARD, addAward);
  yield takeLatest<ItakeLatestSaga>(awardActions.DELETE_AWARD, removeAward);
  yield takeLatest<ItakeLatestSaga>(awardActions.UPDATE_AWARD, editAward);
}

export default AwardSaga;
