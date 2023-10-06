import { IactionRedux } from "../../interfaces/common.interface";
import { institutesActions } from "../actions";

const initState = {
  listInstitutes: [],
  totalInstitutes: 0,
};

const InstitutesReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case institutesActions.GET_LIST_INSTITUTES:
      return {
        ...state,
        loading: true,
      };
    case institutesActions.GET_LIST_INSTITUTES_SUCCESS:
      return {
        ...state,
        listInstitutes: actions?.payload?.results,
        totalInstitutes: actions?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default InstitutesReducer;
