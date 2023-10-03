import { IactionRedux } from "../../interfaces/common.interface";
import { settingActions } from "../actions";

const initState = {
  listLearningRates: [],
  totalLearningRate: 0,
  listSubjectPass: [],
  totalSubjectPass: 0,
  listMoneyCredits: [],
  totalMoneyCredit: 0,
};

const SettingReducer = (state = initState, action: IactionRedux) => {
  switch (action.type) {
    case settingActions.GET_LIST_LEARNING_RATE:
      return {
        ...state,
        loading: true,
      };
    case settingActions.GET_LIST_LEARNING_RATE_SUCCESS:
      return {
        ...state,
        listLearningRates: action?.payload?.results,
        totalLearningRate: action.payload?.total,
        loading: false,
      };
    case settingActions.GET_LIST_SUBJECT_PASS_SUCCESS:
      return {
        ...state,
        listSubjectPass: action?.payload?.results,
        totalSubjectPass: action.payload?.total,
        loading: false,
      };
    case settingActions.GET_LIST_MONEY_CREDIT_SUCCESS:
      return {
        ...state,
        listMoneyCredits: action?.payload?.results,
        totalMoneyCredit: action.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default SettingReducer;
