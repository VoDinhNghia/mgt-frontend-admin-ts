import { IactionRedux } from "../../interfaces/common.interface";
import { schoolActions } from "../actions";

const initState = {
  schoolInfo: {},
};

const SchoolReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case schoolActions.GET_SCHOOL:
      return {
        ...state,
        loading: true,
      };
    case schoolActions.GET_SCHOOL_SUCCESS:
      return {
        ...state,
        schoolInfo: actions?.payload,
      };

    default:
      return state;
  }
};

export default SchoolReducer;
