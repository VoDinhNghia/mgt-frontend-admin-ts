import { takeLatest } from "redux-saga/effects";
import {
  createCountry,
  createDistrict,
  createProvince,
  createWard,
  updateCountry,
  getCountries,
  getDistricts,
  getProvinces,
  getWards,
} from "../../services/countries.service";
import {
  addSagaCommon,
  updateSagaCommon,
  fetchListSagaCommon,
} from "../common";
import { countriesActions } from "../actions";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";

function* addCountry(params: IparamSaga) {
  yield addSagaCommon(createCountry, params, "Add country");
}

function* addProvince(params: IparamSaga) {
  yield addSagaCommon(createProvince, params, "Add province");
}

function* addDistrict(params: IparamSaga) {
  yield addSagaCommon(createDistrict, params, "Add district");
}

function* addWard(params: IparamSaga) {
  yield addSagaCommon(createWard, params, "Add ward");
}

function* editCountry(params: IparamSaga) {
  yield updateSagaCommon(updateCountry, params, "Update country");
}

function* fetchCountries(params: IparamSaga) {
  yield fetchListSagaCommon(
    getCountries,
    countriesActions.GET_LIST_COUNTRY_SUCCESS,
    "Get list countries",
    params
  );
}

function* fetchProvinces(params: IparamSaga) {
  yield fetchListSagaCommon(
    getProvinces,
    countriesActions.GET_LIST_PROVINCE_SUCCESS,
    "Get list province",
    params
  );
}

function* fetchDistricts(params: IparamSaga) {
  yield fetchListSagaCommon(
    getDistricts,
    countriesActions.GET_LIST_DISTRICT_SUCCESS,
    "Get list district",
    params
  );
}

function* fetchWards(params: IparamSaga) {
  yield fetchListSagaCommon(
    getWards,
    countriesActions.GET_LIST_WARD_SUCCESS,
    "Get list ward",
    params
  );
}

function* CountrySaga() {
  yield takeLatest<ItakeLatestSaga>(countriesActions.ADD_COUNTRY, addCountry);
  yield takeLatest<ItakeLatestSaga>(countriesActions.ADD_PROVINCE, addProvince);
  yield takeLatest<ItakeLatestSaga>(countriesActions.ADD_DISTRICT, addDistrict);
  yield takeLatest<ItakeLatestSaga>(countriesActions.ADD_WARD, addWard);
  yield takeLatest<ItakeLatestSaga>(
    countriesActions.UPDATE_COUNTRY,
    editCountry
  );
  yield takeLatest<ItakeLatestSaga>(
    countriesActions.GET_LIST_COUNTRY,
    fetchCountries
  );
  yield takeLatest<ItakeLatestSaga>(
    countriesActions.GET_LIST_PROVINCE,
    fetchProvinces
  );
  yield takeLatest<ItakeLatestSaga>(
    countriesActions.GET_LIST_DISTRICT,
    fetchDistricts
  );
  yield takeLatest<ItakeLatestSaga>(countriesActions.GET_LIST_WARD, fetchWards);
}

export default CountrySaga;
