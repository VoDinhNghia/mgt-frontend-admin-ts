import { IactionRedux } from "../../interfaces/common.interface";
import { scholarshipActions } from "../actions";

const initState = {
  listScholarships: [],
  totalScholarship: 0,
  listUserScholarship: [],
  totalUserScholarship: 0,
};

const ScholarshipReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case scholarshipActions.GET_LIST_SCHOLARSHIP:
      return {
        ...state,
        loading: true,
      };
    case scholarshipActions.GET_LIST_SCHOLARSHIP_SUCCESS:
      return {
        ...state,
        listScholarships: actions?.payload?.results,
        totalScholarship: actions?.payload?.total,
        loading: false,
      };
    case scholarshipActions.GET_LIST_USER_SCHOLARSHIP_SUCCESS:
      return {
        ...state,
        listUserScholarships: actions?.payload?.results,
        totalUserScholarship: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default ScholarshipReducer;
