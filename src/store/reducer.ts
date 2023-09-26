import { combineReducers } from "redux";
import UserReducer from "./users/reducer.user";
import PermissionReducer from "./permissions/reducer.permission";
import RoomReducer from "./rooms/reducer.room";

const rootReducer = combineReducers({
  UserReducer,
  PermissionReducer,
  RoomReducer,
});

export default rootReducer;
