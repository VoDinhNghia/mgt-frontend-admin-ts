import { IactionRedux } from "../../interfaces/common.interface";
import { classSubjectActions } from "../actions";

const initState = {
  listClasses: [],
  totalClass: 0,
  listSubjects: [],
  totalSubject: 0,
};

const ClassSubjectReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case classSubjectActions.GET_LIST_CLASS:
      return {
        ...state,
        loading: true,
      };
    case classSubjectActions.GET_LIST_CLASS_SUCCESS:
      return {
        ...state,
        listClasses: actions?.payload?.results,
        totalClass: actions?.payload?.total,
        loading: false,
      };
    case classSubjectActions.GET_LIST_SUBJECT_SUCCESS:
      return {
        ...state,
        listSubjects: actions?.payload?.results,
        totalSubject: actions?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default ClassSubjectReducer;
