import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IpropMoneyCredit } from "../../../interfaces/setting.interface";
import { IstateRedux } from "../../../interfaces/common.interface";
import { settingActions } from "../../../store/actions";

const MoneyCreditTabPage = (props: IpropMoneyCredit) => {
  const { dispatch, listMoneyCredits = [] } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
  });
  const { page, limit } = state;

  const fetchMoneyCredit = (page: number, limit: number) => {
    dispatch({
      type: settingActions.GET_LIST_MONEY_CREDIT,
      payload: {
        page,
        limit,
      },
    });
  };

  useEffect(() => {
    fetchMoneyCredit(page + 1, limit);
  }, []);

  console.log("listMoneyCredits", listMoneyCredits);

  return <p>Money Credit Tab</p>;
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listMoneyCredits: state.SettingReducer.listMoneyCredits,
    totalMoneyCredits: state.SettingReducer.totalMoneyCredit,
  };
};

export default connect(mapStateToProps)(MoneyCreditTabPage);
