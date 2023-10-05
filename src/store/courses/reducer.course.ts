import { IactionRedux } from "../../interfaces/common.interface";
import { courseActions } from "../actions";

const initSate = {
  listCourses: [],
  totalCourse: 0,
};

const CourseReducer = (state = initSate, actions: IactionRedux) => {
  switch (actions.type) {
    case courseActions.GET_LIST_COURSE:
      return {
        ...state,
        loading: true,
      };
    case courseActions.GET_LIST_COURSE_SUCCESS:
      return {
        ...state,
        listCourses: actions?.payload?.results,
        totalCourse: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default CourseReducer;
