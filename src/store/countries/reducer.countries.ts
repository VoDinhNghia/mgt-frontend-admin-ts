import { IactionRedux } from "../../interfaces/common.interface";
import { countriesActions } from "../actions";

const initState = {
  listCountries: [],
  totalCountry: 0,
  listProvinces: [],
  totalProvince: 0,
  listDistricts: [],
  totalDistrict: 0,
  listWards: [],
  totalWard: 0,
};

const CountryReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case countriesActions.GET_LIST_COUNTRY:
      return {
        ...state,
        loading: true,
      };
    case countriesActions.GET_LIST_COUNTRY_SUCCESS:
      return {
        ...state,
        listCountries: actions?.payload?.results,
        totalCountries: actions?.payload?.total,
        loading: false,
      };
    case countriesActions.GET_LIST_PROVINCE_SUCCESS:
      return {
        ...state,
        listProvinces: actions?.payload?.results,
        totalProvince: actions?.payload?.total,
        loading: false,
      };
    case countriesActions.GET_LIST_DISTRICT_SUCCESS:
      return {
        ...state,
        listDistricts: actions?.payload?.results,
        totalDistrict: actions?.payload?.total,
        loading: false,
      };
    case countriesActions.GET_LIST_WARD_SUCCESS:
      return {
        ...state,
        listWards: actions?.payload?.results,
        totalWard: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default CountryReducer;
