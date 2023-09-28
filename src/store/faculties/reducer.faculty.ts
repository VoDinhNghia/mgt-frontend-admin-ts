import { IactionRedux } from "../../interfaces/common.interface";
import { facultyActions } from "../actions";

const initSate = {
  listFaculties: [],
  totalFaculty: 0,
  listMajors: [],
  totalMajor: 0,
};

const FacultyReducer = (state = initSate, action: IactionRedux) => {
  switch (action.type) {
    case facultyActions.GET_LIST_FACULTY:
      return {
        ...state,
        loading: true,
      };
    case facultyActions.GET_LIST_FACULTY_SUCCESS:
      return {
        ...state,
        listFaculties: action?.payload?.results,
        totalFaculty: action?.payload?.total,
        loading: false,
      };
    case facultyActions.GET_LIST_MAJOR_SUCCESS:
      return {
        ...state,
        listMajors: action?.payload?.results,
        totalMajor: action?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default FacultyReducer;
