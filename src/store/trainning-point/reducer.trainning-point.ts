import { IactionRedux } from "../../interfaces/common.interface";
import { trainningPointActions } from "../actions";

const initState = {
  listTrainningPoints: [],
  totalTrainningPoint: 0,
  listVoluntees: [],
  totalVoluntee: 0,
};

const TrainningPointReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case trainningPointActions.GET_LIST_TRAINNING_POINT:
      return {
        ...state,
        loading: true,
      };
    case trainningPointActions.GET_LIST_TRAINNING_POINT_SUCCESS:
      return {
        ...state,
        listTrainningPoints: actions?.payload?.results,
        totalTrainningPoint: actions?.payload?.total,
        loading: false,
      };
    case trainningPointActions.GET_LIST_VOLUNTEE_SUCCESS:
      return {
        ...state,
        listVoluntees: actions?.payload?.results,
        totalVoluntee: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default TrainningPointReducer;
