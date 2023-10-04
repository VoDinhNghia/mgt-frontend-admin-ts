import { IactionRedux } from "../../interfaces/common.interface";
import { awardActions } from "../actions";

const initState = {
  listAwards: [],
  totalAward: 0,
};

const AwardReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case awardActions.GET_LIST_AWARD:
      return {
        ...state,
        loading: true,
      };
    case awardActions.GET_LIST_AWARD_SUCCESS:
      return {
        ...state,
        listAwards: actions?.payload?.results,
        totalAward: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default AwardReducer;
