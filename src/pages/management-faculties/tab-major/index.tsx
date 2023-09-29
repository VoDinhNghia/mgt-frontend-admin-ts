import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IpropMajorTab } from "../../../interfaces/faculty.interface";
import { IstateRedux } from "../../../interfaces/common.interface";
import { facultyActions } from "../../../store/actions";
import {
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
} from "@mui/material";

const MajorTabPage = (props: IpropMajorTab) => {
  const { dispatch, listMajors = [] } = props;

  const fetchMajors = () => {
    dispatch({
      type: facultyActions.GET_LIST_MAJOR,
      payload: {
        page: 1,
        limit: 10,
      },
    });
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  console.log("listMajors", listMajors);

  return <p>Major Tab</p>;
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listMajors: state.FacultyReducer.listMajors,
    totalMajor: state.FacultyReducer.totalMajor,
  };
};

export default connect(mapStateToProps)(MajorTabPage);
