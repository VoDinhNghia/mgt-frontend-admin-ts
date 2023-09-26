/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationContainer } from "react-notifications";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { routes } from "./constants/constant";
import store from "./store";
import { Provider } from "react-redux";
import DashboardPage from "./pages/dashboard";
import ProtectedRoutes from "./utils/protected-route.util";
import NotfoundPage from "./pages/notfound";
import UserManagementPage from "./pages/management-users";
import PermissionMgtPage from "./pages/management-permission";
import RoomMgtPage from "./pages/management-rooms";
import FacultyMgtPage from "./pages/management-faculties";
import SettingMgtPage from "./pages/management-settings";
import AwardMgtPage from "./pages/management-awards";
import BranchMgtPage from "./pages/management-branch";
import ClassSubjectMgtPage from "./pages/management-class-subject";
import CourseMgtPage from "./pages/management-courses";
import UnionsMgtPage from "./pages/management-unions";
import SemesterMgtPage from "./pages/management-semesters";
import SchoolMgtPage from "./pages/management-school";
import ScholarshipMgtPage from "./pages/management-scholarships";
import DegreelevelMgtPage from "./pages/management-degreelevel";
import PaymentMgtPage from "./pages/management-payment";
import InstitutesMgtPage from "./pages/management-institutes";
import DeparmentMgtPage from "./pages/management-deparments";
import CentersMgtPage from "./pages/management-centers";
import NewsMgtPage from "./pages/management-news";
import TrainningPointMgtPage from "./pages/management-trainning-point";
import StudyProcessMgtPage from "./pages/management-study-process";
import BlogServiceMgtPage from "./pages/management-blogs-service";
import AttendanceServiceMgtPage from "./pages/management-attendance-service";
import LibraryServiceMgtPage from "./pages/management-library-service";
import CountriesMgtPage from "./pages/management-countries";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route
            path={routes.dashboard}
            element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.userMgt}
            element={
              <ProtectedRoutes>
                <UserManagementPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.permissionMgt}
            element={
              <ProtectedRoutes>
                <PermissionMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.roomMgt}
            element={
              <ProtectedRoutes>
                <RoomMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.facultyMgt}
            element={
              <ProtectedRoutes>
                <FacultyMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.settingMgt}
            element={
              <ProtectedRoutes>
                <SettingMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.awardMgt}
            element={
              <ProtectedRoutes>
                <AwardMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.branchMgt}
            element={
              <ProtectedRoutes>
                <BranchMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.classSubjectMgt}
            element={
              <ProtectedRoutes>
                <ClassSubjectMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.courseMgt}
            element={
              <ProtectedRoutes>
                <CourseMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.unionsMgt}
            element={
              <ProtectedRoutes>
                <UnionsMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.semesterMgt}
            element={
              <ProtectedRoutes>
                <SemesterMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.schoolMgt}
            element={
              <ProtectedRoutes>
                <SchoolMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.scholarshipMgt}
            element={
              <ProtectedRoutes>
                <ScholarshipMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.degreelevelMgt}
            element={
              <ProtectedRoutes>
                <DegreelevelMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.paymentMgt}
            element={
              <ProtectedRoutes>
                <PaymentMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.institutesMgt}
            element={
              <ProtectedRoutes>
                <InstitutesMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.deparmentMgt}
            element={
              <ProtectedRoutes>
                <DeparmentMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.centerMgt}
            element={
              <ProtectedRoutes>
                <CentersMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.countriesMgt}
            element={
              <ProtectedRoutes>
                <CountriesMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.newsMgt}
            element={
              <ProtectedRoutes>
                <NewsMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.trainningPointMgt}
            element={
              <ProtectedRoutes>
                <TrainningPointMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.studyProcessMgt}
            element={
              <ProtectedRoutes>
                <StudyProcessMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.blogServiceMgt}
            element={
              <ProtectedRoutes>
                <BlogServiceMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.attendanceServiceMgt}
            element={
              <ProtectedRoutes>
                <AttendanceServiceMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path={routes.libraryServiceMgt}
            element={
              <ProtectedRoutes>
                <LibraryServiceMgtPage />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
        <NotificationContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
