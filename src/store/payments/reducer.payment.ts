import { IactionRedux } from "../../interfaces/common.interface";
import { paymentActions } from "../actions";

const initState = {
  listPayments: [],
  totalPayment: 0,
};

const PaymentReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case paymentActions.GET_LIST_PAYMENT:
      return {
        ...state,
        loading: true,
      };
    case paymentActions.GET_LIST_PAYMENT_SUCCESS:
      return {
        ...state,
        listPayments: actions?.payload?.results,
        totalPayment: actions?.payload?.total,
        loading: false,
      };

    default:
      return state;
  }
};

export default PaymentReducer;
