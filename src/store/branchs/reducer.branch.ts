import { IactionRedux } from "../../interfaces/common.interface";
import { branchActions } from "../actions";

const initState = {
  listBranchs: [],
  totalBranch: 0,
};

const BranchReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case branchActions.GET_LIST_BRANCH:
      return {
        ...state,
        loading: true,
      };
    case branchActions.GET_LIST_BRANCH_SUCCESS:
      return {
        ...state,
        listBranchs: actions?.payload?.results,
        totalBranch: actions?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default BranchReducer;
