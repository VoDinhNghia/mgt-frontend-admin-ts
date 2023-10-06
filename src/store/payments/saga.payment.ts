import { takeLatest } from "redux-saga/effects";
import { createPayment, getPayments } from "../../services/payment.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { paymentActions } from "../actions";
import { addSagaCommon, fetchListSagaCommon } from "../common";

function* addPayment(params: IparamSaga) {
  yield addSagaCommon(createPayment, params, "Add payment");
}

function* fetchPayments(params: IparamSaga) {
  yield fetchListSagaCommon(
    getPayments,
    paymentActions.GET_LIST_PAYMENT_SUCCESS,
    "Get list payments",
    params
  );
}

function* PaymentSaga() {
  yield takeLatest<ItakeLatestSaga>(paymentActions.ADD_PAYMENT, addPayment);
  yield takeLatest<ItakeLatestSaga>(
    paymentActions.GET_LIST_PAYMENT,
    fetchPayments
  );
}

export default PaymentSaga;
