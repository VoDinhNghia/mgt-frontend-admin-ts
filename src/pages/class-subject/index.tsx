import React, { SyntheticEvent, useState, useEffect } from "react";
import { validateAccessModule } from "../../utils/permission.util";
import { moduleNames, userRoles } from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TitleHeaderPage from "../commons/title-header";
import ClassTabMgtPage from "./class-tab";
import SubjectTabMgtPage from "./subject-tab";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IpropsClassMgtPage } from "../../interfaces/class-subject.interface";
import {
  courseActions,
  degreelevelActions,
  facultyActions,
  userActions,
} from "../../store/actions";
import { handleUserOptions } from "../../utils/faculty.util";
import {
  handleCourseOptions,
  handleDegreelevelOptions,
  handleMajorOptions,
} from "../../utils/class-subject.util";

const ClassSubjectMgtPage = (props: IpropsClassMgtPage) => {
  const classTab = "Class Tab";
  const subjectTab = "Subject Tab";
  const {
    listCourses = [],
    listMajors = [],
    listDegreelevels = [],
    listUsers = [],
    dispatch,
  } = props;
  const [tabIndex, setTabIndex] = useState(classTab);
  const isAccess = validateAccessModule(moduleNames.CLASS_SUBJECT_MANAGEMENT);
  const onChangeTab = (e: SyntheticEvent, newTab: string) => {
    setTabIndex(newTab);
  };
  const userOptions = handleUserOptions(listUsers);
  const courseOptions = handleCourseOptions(listCourses);
  const majorOptions = handleMajorOptions(listMajors);
  const degreeLevelOptions = handleDegreelevelOptions(listDegreelevels);

  const fetchLists = (type: string) => {
    dispatch({
      type,
    });
  };

  const fetchUsers = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        role: userRoles.LECTURER,
      },
    });
  };

  useEffect(() => {
    fetchLists(degreelevelActions.GET_LIST_DEGREELEVEL);
    fetchLists(facultyActions.GET_LIST_MAJOR);
    fetchLists(courseActions.GET_LIST_COURSE);
    fetchUsers();
  }, []);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <TitleHeaderPage title="Class subject management page" />
              <Box>
                <TabContext value={tabIndex}>
                  <Box>
                    <TabList
                      onChange={onChangeTab}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="class tab"
                    >
                      <Tab value={classTab} label={classTab} />
                      <Tab value={subjectTab} label={subjectTab} />
                    </TabList>
                  </Box>
                  <TabPanel value={classTab}>
                    <ClassTabMgtPage 
                      userOptions={userOptions}
                      courseOptions={courseOptions}
                      degreeLevelOptions={degreeLevelOptions}
                      majorOptions={majorOptions}
                    />
                  </TabPanel>
                  <TabPanel value={subjectTab}>
                    <SubjectTabMgtPage />
                  </TabPanel>
                </TabContext>
              </Box>
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
    listMajors: state.FacultyReducer.listMajors,
    listDegreelevels: state.DegreelevelReducer.listDegreelevels,
    listCourses: state.CourseReducer.listCourses,
    listUsers: state.UserReducer.listUsers,
  };
};

export default connect(mapStateToProps)(ClassSubjectMgtPage);
