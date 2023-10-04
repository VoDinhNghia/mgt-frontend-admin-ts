import { combineReducers } from "redux";
import UserReducer from "./users/reducer.user";
import PermissionReducer from "./permissions/reducer.permission";
import RoomReducer from "./rooms/reducer.room";
import FacultyReducer from "./faculties/reducer.faculty";
import SettingReducer from "./settings/reducer.setting";
import AwardReducer from "./awards/reducer.award";

const rootReducer = combineReducers({
  UserReducer,
  PermissionReducer,
  RoomReducer,
  FacultyReducer,
  SettingReducer,
  AwardReducer,
});

export default rootReducer;
