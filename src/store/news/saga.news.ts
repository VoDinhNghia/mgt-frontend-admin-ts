import { takeLatest } from "redux-saga/effects";
import {
  createNews,
  updateNews,
  deleteNews,
  getNews,
} from "../../services/news.service";
import {
  addSagaCommon,
  updateSagaCommon,
  removeSagaCommon,
  fetchListSagaCommon,
} from "../common";
import { newsActions } from "../actions";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";

function* addNews(params: IparamSaga) {
  yield addSagaCommon(createNews, params, "Add news");
}

function* editNews(params: IparamSaga) {
  yield updateSagaCommon(updateNews, params, "Update news");
}

function* removeNews(params: IparamSaga) {
  yield removeSagaCommon(deleteNews, params, "Delete news");
}

function* fetchNews(params: IparamSaga) {
  yield fetchListSagaCommon(
    getNews,
    newsActions.GET_LIST_NEWS_SUCCESS,
    "Get list news",
    params
  );
}

function* NewsSaga() {
  yield takeLatest<ItakeLatestSaga>(newsActions.ADD_NEWS, addNews);
  yield takeLatest<ItakeLatestSaga>(newsActions.UPDATE_NEWS, editNews);
  yield takeLatest<ItakeLatestSaga>(newsActions.DELETE_NEWS, removeNews);
  yield takeLatest<ItakeLatestSaga>(newsActions.GET_LIST_NEWS, fetchNews);
}

export default NewsSaga;
