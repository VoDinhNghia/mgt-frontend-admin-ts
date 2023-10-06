import { IactionRedux } from "../../interfaces/common.interface";
import { departmentActions } from "../actions";

const initState = {
  listDepartments: [],
  totalDepartment: 0,
};

const DepartmentReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case departmentActions.GET_LIST_DEPARTMENT:
      return {
        ...state,
        loading: true,
      };
    case departmentActions.GET_LIST_DEPARTMENT_SUCCESS:
      return {
        ...state,
        listDepartments: actions?.payload?.results,
        totalDepartment: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default DepartmentReducer;
