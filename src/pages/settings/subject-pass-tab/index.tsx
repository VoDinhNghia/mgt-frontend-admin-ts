import React, { useEffect, useState } from "react";
import { IpropSubjectPass } from "../../../interfaces/setting.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { settingActions } from "../../../store/actions";

const SubjectPassTabPage = (props: IpropSubjectPass) => {
  const { dispatch, listSubjectPass = [] } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10
  });
  const { page, limit } = state;

  const fetchSubjectPass = (page: number, limit: number) => {
    dispatch({
      type: settingActions.GET_LIST_SUBJECT_PASS,
      payload: {
        page,
        limit,
      }
    });
  }

  useEffect(() => {
    fetchSubjectPass(page + 1, limit);
  }, []);

  console.log("listSubjectPass", listSubjectPass);

  return <p>Subject Pass Tab</p>;
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listSubjectPass: state.SettingReducer.listSubjectPass,
    totalSubjectPass: state.SettingReducer.totalSubjectPass,
  }
}

export default connect(mapStateToProps)(SubjectPassTabPage);
