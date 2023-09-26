import { IactionRedux } from "../../interfaces/common.interface";
import { roomActions } from "../actions";

const initState = {
  listRooms: [],
  totalRoom: 0,
};

const RoomReducer = (state = initState, action: IactionRedux) => {
  switch (action.type) {
    case roomActions.GET_LIST_ROOM:
      return {
        ...state,
        loading: true,
      };
    case roomActions.GET_LIST_ROOM_SUCCESS:
      return {
        ...state,
        listRooms: action?.payload?.results,
        totalRoom: action?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default RoomReducer;
