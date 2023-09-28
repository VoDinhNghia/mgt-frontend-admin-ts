import React, { useEffect } from "react";
import { IpropFacultyTab } from "../../../interfaces/faculty.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { facultyActions } from "../../../store/actions";

const FacultyTabPage = (props: IpropFacultyTab) => {
  const { listFaculties = [], dispatch } = props;

  const fetchFaculties = () => {
    dispatch({
      type: facultyActions.GET_LIST_FACULTY,
      payload: {
        limit: 10,
        page: 1,
      },
    });
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  console.log("listFaculties", listFaculties);

  return <p>Faculty Tab</p>;
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listFaculties: state.FacultyReducer.listFaculties,
    totalFaculty: state.FacultyReducer.totalFaculty,
  };
};

export default connect(mapStateToProps)(FacultyTabPage);
