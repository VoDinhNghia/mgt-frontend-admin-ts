import { IactionRedux } from "../../interfaces/common.interface";
import { studyProcessActions } from "../actions";

const initState = {
  listStudyProcess: [],
  totalStudyProcess: 0,
  listStudyStudents: [],
  totalStudyStudent: 0,
};

const StudyProcessReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case studyProcessActions.GET_LIST_STUDY_PROCESS:
      return {
        ...state,
        loading: true,
      };
    case studyProcessActions.GET_LIST_STUDY_PROCESS_SUCCESS:
      return {
        ...state,
        listStudyProcess: actions?.payload?.results,
        totalStudyProcess: actions?.payload?.total,
        loading: false,
      };
    case studyProcessActions.GET_LIST_STUDY_PROCESS_STUDENTS_SUCCESS:
      return {
        ...state,
        listStudyStudents: actions?.payload?.results,
        totalStudyStudent: actions?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default StudyProcessReducer;
