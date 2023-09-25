import { combineReducers } from "redux";
import UserReducer from "./users/reducer.user";
import PermissionReducer from "./permissions/reducer.permission";

const rootReducer = combineReducers({
  UserReducer,
  PermissionReducer,
});

export default rootReducer;
