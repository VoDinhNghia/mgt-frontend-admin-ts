import { IactionRedux } from "../../interfaces/common.interface";
import { unionActions } from "../actions";

const initState = {
  listUnions: [],
  totalUnion: 0,
  listUnionMembers: [],
  totalUnionMember: 0,
  listUnionImages: [],
  totalUnionImage: 0,
};

const UnionReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case unionActions.GET_LIST_UNION:
      return {
        ...state,
        loading: true,
      };
    case unionActions.GET_LIST_UNION_SUCCESS:
      return {
        ...state,
        listUnions: actions?.payload?.results,
        totalUnion: actions?.payload?.total,
      };
    case unionActions.GET_LIST_UNION_IMAGE_SUCCESS:
      return {
        ...state,
        listUnionMembers: actions?.payload?.results,
        totalUnionMember: actions?.payload?.total,
      };
    case unionActions.GET_LIST_UNION_MEMBER_SUCCESS:
      return {
        ...state,
        listUnionImages: actions?.payload?.results,
        totalUnionImage: actions?.payload?.total,
      };
    default:
      return state;
  }
};

export default UnionReducer;
