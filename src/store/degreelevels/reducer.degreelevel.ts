import { IactionRedux } from "../../interfaces/common.interface";
import { degreelevelActions } from "../actions";

const initState = {
  listDegreelevels: [],
  totalDegreelevel: 0,
};

const DegreelevelReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case degreelevelActions.GET_LIST_DEGREELEVEL:
      return {
        ...state,
        loading: true,
      };
    case degreelevelActions.GET_LIST_DEGREELEVEL_SUCCESS:
      return {
        ...state,
        listDegreelevels: actions?.payload?.results,
        totalDegreelevel: actions?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default DegreelevelReducer;
