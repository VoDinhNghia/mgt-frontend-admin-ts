import React, { useEffect, useState } from "react";
import { IpropLearningRate } from "../../../interfaces/setting.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { settingActions } from "../../../store/actions";

const LearningRateTabPage = (props: IpropLearningRate) => {
  const { listLearningRates = [], dispatch } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
  });
  const { page, limit } = state;

  const fetchLearningRate = (page: number, limit: number) => {
    dispatch({
      type: settingActions.GET_LIST_LEARNING_RATE,
      payload: {
        page,
        limit,
      },
    });
  };

  useEffect(() => {
    fetchLearningRate(page + 1, limit);
  }, []);

  console.log("listLearningRate", listLearningRates);

  return <p>Learning Rate Tab</p>;
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listLearningRates: state.SettingReducer.listLearningRates,
    totalLearningRate: state.SettingReducer.totalLearningRate,
  };
};

export default connect(mapStateToProps)(LearningRateTabPage);
