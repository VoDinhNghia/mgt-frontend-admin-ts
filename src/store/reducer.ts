import { combineReducers } from "redux";
import UserReducer from "./users/reducer.user";

const rootReducer = combineReducers({
    UserReducer,
});

export default rootReducer;