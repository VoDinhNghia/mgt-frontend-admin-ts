import { IactionRedux } from "../../interfaces/common.interface";
import { permissionActions } from "../actions";

const initState = {
  listPermissions: [],
  totalPermission: 0,
};

const PermissionReducer = (state = initState, action: IactionRedux) => {
  switch (action.type) {
    case permissionActions.GET_LIST_PERMISSION:
      return {
        ...state,
        loading: true,
      };
    case permissionActions.GET_LIST_PERMISSION_SUCCESS:
      return {
        ...state,
        listPermissions: action?.payload?.results,
        totalPermission: action?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default PermissionReducer;
