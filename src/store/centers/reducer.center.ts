import { IactionRedux } from "../../interfaces/common.interface";
import { centerActions } from "../actions";

const initState = {
  listCenters: [],
  totalCenter: 0,
};

const CenterReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case centerActions.GET_LIST_CENTER:
      return {
        ...state,
        loading: true,
      };
    case centerActions.GET_LIST_CENTER_SUCCESS:
      return {
        ...state,
        listCenters: actions?.payload?.results,
        totalCenter: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default CenterReducer;
