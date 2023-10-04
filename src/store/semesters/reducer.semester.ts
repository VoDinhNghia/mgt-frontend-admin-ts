import { IactionRedux } from "../../interfaces/common.interface";
import { semesterActions } from "../actions";

const initState = {
  listSemesters: [],
  totalSemester: 0,
};

const SemesterReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case semesterActions.GET_LIST_SEMESTER:
      return {
        ...state,
        loading: false,
      };
    case semesterActions.GET_LIST_SEMESTER_SUCCESS:
      return {
        ...state,
        listSemesters: actions?.payload?.results,
        totalSemester: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default SemesterReducer;
