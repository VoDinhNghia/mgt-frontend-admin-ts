import React, { useEffect } from "react";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { validateAccessModule } from "../../utils/permission-handle.util";
import { moduleNames } from "../../constants/constant";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IpropFacultyMgt } from "../../interfaces/faculty.interface";
import { facultyActions } from "../../store/actions";

const FacultyMgtPage = (props: IpropFacultyMgt) => {
  const { listFaculties = [], dispatch } = props;
  const isAccess = validateAccessModule(moduleNames.FACULTIES_MANAGEMENT);
  const fetchFaculties = () => {
    dispatch({
      type: facultyActions.GET_LIST_FACULTY,
      payload: {
        limit: 10,
        page: 1,
      }
    });
  }

  useEffect(() => {
    fetchFaculties();
  }, []);

  console.log("listFaculties", listFaculties);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <p>Faculty management page</p>
            </Container>
          </Container>
          <FooterPage />
        </div>
      ) : (
        <ForbidenPage />
      )}
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listFaculties: state.FacultyReducer.listFaculties,
    totalFaculty: state.FacultyReducer.totalFaculty,
    listMajors: state.FacultyReducer.listMajors,
    totalMajor: state.FacultyReducer.totalMajor,
  };
}

export default connect(mapStateToProps)(FacultyMgtPage);
