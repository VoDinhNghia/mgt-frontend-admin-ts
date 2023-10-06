import { IactionRedux } from "../../interfaces/common.interface";
import { newsActions } from "../actions";

const initState = {
  listNews: [],
  totalNews: 0,
};

const NewsReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case newsActions.GET_LIST_NEWS:
      return {
        ...state,
        loading: true,
      };
    case newsActions.GET_LIST_NEWS_SUCCESS:
      return {
        ...state,
        listNews: actions?.payload?.results,
        totalNews: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default NewsReducer;
