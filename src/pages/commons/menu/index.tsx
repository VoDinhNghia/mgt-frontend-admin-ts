import React, { useState, useEffect } from "react";
import { Nav, Sidebar, Sidenav } from "rsuite";
import NavToggleMenuPage from "./nav-toggle";
import LogOutIcon from "@rsuite/icons/legacy/SignOut";
import { logOut } from "../../../services/auth.service";
import { moduleNames, routes } from "../../../constants/constant";
import "./index.css";
import {
  IstateRedux,
  IuserReducer,
} from "../../../interfaces/common.interface";
import { connect } from "react-redux";
import { userActions } from "../../../store/actions";
import UserMgtIcon from "@rsuite/icons/legacy/Group";
import PermissonIcon from "@rsuite/icons/legacy/Gear";
import { validateAccessModule } from "../../../utils/permission-handle.util";
import RoomIcon from "@rsuite/icons/legacy/Home";
import FacultyIcon from "@rsuite/icons/legacy/List";
import SettingIcon from "@rsuite/icons/legacy/GearCircle";
import BranchIcon from "@rsuite/icons/legacy/ListAlt";
import AwardIcon from "@rsuite/icons/legacy/Gift"; 
import ClassSubjectIcon from "@rsuite/icons/legacy/Subscript";
import CourseIcon from "@rsuite/icons/legacy/Calendar";
import UnionsIcon from "@rsuite/icons/legacy/Underline";
import SemesterIcon from "@rsuite/icons/legacy/Scribd";
import SchoolIcon from "@rsuite/icons/legacy/Dashboard";  

const MenuPage = (props: IuserReducer) => {
  const { userInfo = {} } = props;
  const [expand, setExpand] = useState(true);

  const userName = `${userInfo?.profile?.lastName} ${userInfo?.profile?.middleName} ${userInfo?.profile?.firstName}`;
  const isAccessModuleUser = validateAccessModule(moduleNames.USER_MANAGEMENT);
  const isAccessModulePermission = validateAccessModule(
    moduleNames.PERMISSION_MANAGEMENT
  );
  const isAccessModuleRoom = validateAccessModule(moduleNames.ROOM_MANAGEMENT);
  const isAccessModuleFaculty = validateAccessModule(
    moduleNames.FACULTIES_MANAGEMENT
  );
  const isAccessModuleSetting = validateAccessModule(moduleNames.SETTINGS);
  const isAccessModuleAward = validateAccessModule(
    moduleNames.AWARDS_MANAGEMENT
  );
  const isAccessModuleBranch = validateAccessModule(
    moduleNames.BRANCH_MANAGEMENT
  );
  const isAccessModuleClassSubject = validateAccessModule(
    moduleNames.CLASS_SUBJECT_MANAGEMENT
  );
  const isAccessModuleCourse = validateAccessModule(
    moduleNames.COURSE_MANAGEMENT
  );
  const isAccessModuleUnions = validateAccessModule(
    moduleNames.UNIONS_MANAGEMENT
  );
  const isAccessModuleSemester = validateAccessModule(
    moduleNames.SEMESTERS_MANAGEMENT
  );
  const isAccessModuleSchool = validateAccessModule(
    moduleNames.SCHOOL_MANAGEMENT
  );
  const isAccessModuleScholarship = validateAccessModule(
    moduleNames.SCHOLARSHIPS_MANAGEMENT
  );
  const isAccessModuleDegreeLevel = validateAccessModule(
    moduleNames.DEGREELEVELS_MANAGEMENT
  );
  const isAccessModulePayment = validateAccessModule(
    moduleNames.PAYMENTS_MANAGEMENT
  );
  const isAccessModuleInstitutes = validateAccessModule(
    moduleNames.INSTITUTES_MANAGEMENT
  );
  const isAccessModuleDepartment = validateAccessModule(
    moduleNames.DEPARTMENTS_MANAGEMENT
  );
  const isAccessModuleCenter = validateAccessModule(
    moduleNames.CENTER_MANAGEMENT
  );
  const isAccessModuleCountry = validateAccessModule(
    moduleNames.COUNTRIES_MANAGEMENT
  );
  const isAccessModuleNews = validateAccessModule(moduleNames.NEWS_MANAGEMENT);
  const isAccessModuleTrainningPoint = validateAccessModule(
    moduleNames.TRAINNING_POINT_MANAGEMENT
  );
  const isAccessModuleStudyProcess = validateAccessModule(
    moduleNames.STUDY_PROCESS_MANAGEMENT
  );
  const isAccessModuleBlogService = validateAccessModule(
    moduleNames.BLOG_SERVICE_MANAGEMENT
  );
  const isAccessModuleAttendance = validateAccessModule(
    moduleNames.ATTENDANCE_SERVICE_MANAGEMENT
  );
  const isAccessModuleLibrary = validateAccessModule(
    moduleNames.LIBRARY_SERVICE_MANAGEMENT
  );

  const fetchUserInfo = () => {
    const { dispatch } = props;
    dispatch({
      type: userActions.GET_ME,
    });
  };

  const logOutHandle = () => {
    logOut();
    setTimeout(() => {
      window.location.href = routes.login;
    }, 70);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Sidebar
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
      width={expand ? 300 : 70}
      collapsible
    >
      <Sidenav.Header>
        <div
          style={{
            padding: 18,
            fontSize: 16,
            height: 56,
            background: "blue",
            color: "#fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <a href={routes.dashboard} className="text-white">
            <img src="/images/userIcon.jpg" alt="" className="UserAvatar" />
            <span>{expand ? userName : null}</span>
          </a>
        </div>
      </Sidenav.Header>
      <Sidenav expanded={expand} appearance="subtle">
        <Sidenav.Body>
          <Nav>
            {isAccessModuleUser ? (
              <Nav.Item
                eventKey={moduleNames.USER_MANAGEMENT}
                icon={<UserMgtIcon />}
                className="ItemMenuPage"
                href={routes.userMgt}
              >
                {moduleNames.USER_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModulePermission ? (
              <Nav.Item
                eventKey={moduleNames.PERMISSION_MANAGEMENT}
                icon={<PermissonIcon />}
                className="ItemMenuPage"
                href={routes.permissionMgt}
              >
                {moduleNames.PERMISSION_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleRoom ? (
              <Nav.Item
                eventKey={moduleNames.ROOM_MANAGEMENT}
                icon={<RoomIcon />}
                className="ItemMenuPage"
                href={routes.roomMgt}
              >
                {moduleNames.ROOM_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleFaculty ? (
              <Nav.Item
                eventKey={moduleNames.FACULTIES_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.facultyMgt}
              >
                {moduleNames.FACULTIES_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleSetting ? (
              <Nav.Item
                eventKey={moduleNames.SETTINGS}
                icon={<SettingIcon />}
                className="ItemMenuPage"
                href={routes.settingMgt}
              >
                {moduleNames.SETTINGS}
              </Nav.Item>
            ) : null}
            {isAccessModuleAward ? (
              <Nav.Item
                eventKey={moduleNames.AWARDS_MANAGEMENT}
                icon={<AwardIcon />}
                className="ItemMenuPage"
                href={routes.awardMgt}
              >
                {moduleNames.AWARDS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleBranch ? (
              <Nav.Item
                eventKey={moduleNames.BRANCH_MANAGEMENT}
                icon={<BranchIcon />}
                className="ItemMenuPage"
                href={routes.branchMgt}
              >
                {moduleNames.BRANCH_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleClassSubject ? (
              <Nav.Item
                eventKey={moduleNames.CLASS_SUBJECT_MANAGEMENT}
                icon={<ClassSubjectIcon />}
                className="ItemMenuPage"
                href={routes.classSubjectMgt}
              >
                {moduleNames.CLASS_SUBJECT_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleCourse ? (
              <Nav.Item
                eventKey={moduleNames.COURSE_MANAGEMENT}
                icon={<CourseIcon />}
                className="ItemMenuPage"
                href={routes.courseMgt}
              >
                {moduleNames.COURSE_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleUnions ? (
              <Nav.Item
                eventKey={moduleNames.UNIONS_MANAGEMENT}
                icon={<UnionsIcon />}
                className="ItemMenuPage"
                href={routes.unionsMgt}
              >
                {moduleNames.UNIONS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleSemester ? (
              <Nav.Item
                eventKey={moduleNames.SEMESTERS_MANAGEMENT}
                icon={<SemesterIcon />}
                className="ItemMenuPage"
                href={routes.semesterMgt}
              >
                {moduleNames.SEMESTERS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleSchool ? (
              <Nav.Item
                eventKey={moduleNames.SCHOOL_MANAGEMENT}
                icon={<SchoolIcon />}
                className="ItemMenuPage"
                href={routes.schoolMgt}
              >
                {moduleNames.SCHOOL_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleScholarship ? (
              <Nav.Item
                eventKey={moduleNames.SCHOLARSHIPS_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.scholarshipMgt}
              >
                {moduleNames.SCHOLARSHIPS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleDegreeLevel ? (
              <Nav.Item
                eventKey={moduleNames.DEGREELEVELS_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.degreelevelMgt}
              >
                {moduleNames.DEGREELEVELS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModulePayment ? (
              <Nav.Item
                eventKey={moduleNames.PAYMENTS_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.paymentMgt}
              >
                {moduleNames.PAYMENTS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleInstitutes ? (
              <Nav.Item
                eventKey={moduleNames.INSTITUTES_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.institutesMgt}
              >
                {moduleNames.INSTITUTES_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleDepartment ? (
              <Nav.Item
                eventKey={moduleNames.DEPARTMENTS_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.deparmentMgt}
              >
                {moduleNames.DEPARTMENTS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleCenter ? (
              <Nav.Item
                eventKey={moduleNames.CENTER_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.centerMgt}
              >
                {moduleNames.CENTER_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleCountry ? (
              <Nav.Item
                eventKey={moduleNames.COUNTRIES_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.countriesMgt}
              >
                {moduleNames.COUNTRIES_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleNews ? (
              <Nav.Item
                eventKey={moduleNames.NEWS_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.newsMgt}
              >
                {moduleNames.NEWS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleTrainningPoint ? (
              <Nav.Item
                eventKey={moduleNames.TRAINNING_POINT_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.trainningPointMgt}
              >
                {moduleNames.TRAINNING_POINT_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleStudyProcess ? (
              <Nav.Item
                eventKey={moduleNames.STUDY_PROCESS_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.studyProcessMgt}
              >
                {moduleNames.STUDY_PROCESS_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleBlogService ? (
              <Nav.Item
                eventKey={moduleNames.BLOG_SERVICE_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.blogServiceMgt}
              >
                {moduleNames.BLOG_SERVICE_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleAttendance ? (
              <Nav.Item
                eventKey={moduleNames.ATTENDANCE_SERVICE_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.attendanceServiceMgt}
              >
                {moduleNames.ATTENDANCE_SERVICE_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isAccessModuleLibrary ? (
              <Nav.Item
                eventKey={moduleNames.LIBRARY_SERVICE_MANAGEMENT}
                icon={<FacultyIcon />}
                className="ItemMenuPage"
                href={routes.libraryServiceMgt}
              >
                {moduleNames.LIBRARY_SERVICE_MANAGEMENT}
              </Nav.Item>
            ) : null}
            <Nav.Item
              eventKey="LOGOUT"
              icon={<LogOutIcon />}
              className="ItemMenuPage"
              onClick={() => logOutHandle()}
            >
              LogOut
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggleMenuPage expand={expand} setExpand={() => setExpand(!expand)} />
    </Sidebar>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    userInfo: state.UserReducer.userInfo,
  };
};

export default connect(mapStateToProps)(MenuPage);
