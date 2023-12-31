import { combineReducers } from "redux";
import UserReducer from "./users/reducer.user";
import PermissionReducer from "./permissions/reducer.permission";
import RoomReducer from "./rooms/reducer.room";
import FacultyReducer from "./faculties/reducer.faculty";
import SettingReducer from "./settings/reducer.setting";
import AwardReducer from "./awards/reducer.award";
import BranchReducer from "./branchs/reducer.branch";
import CourseReducer from "./courses/reducer.course";
import UnionReducer from "./unions/reducer.union";
import SemesterReducer from "./semesters/reducer.semester";
import ClassSubjectReducer from "./class-subject/reducer.class-subject";
import SchoolReducer from "./school/reducer.school";
import ScholarshipReducer from "./scholarships/reducer.scholarship";
import DegreelevelReducer from "./degreelevels/reducer.degreelevel";
import PaymentReducer from "./payments/reducer.payment";
import InstitutesReducer from "./institutes/reducer.institutes";
import DepartmentReducer from "./departments/reducer.department";
import CenterReducer from "./centers/reducer.center";
import CountryReducer from "./countries/reducer.countries";
import NewsReducer from "./news/reducer.news";
import TrainningPointReducer from "./trainning-point/reducer.trainning-point";
import StudyProcessReducer from "./study-process/reducer.study-process";

const rootReducer = combineReducers({
  UserReducer,
  PermissionReducer,
  RoomReducer,
  FacultyReducer,
  SettingReducer,
  AwardReducer,
  BranchReducer,
  CourseReducer,
  UnionReducer,
  SemesterReducer,
  ClassSubjectReducer,
  ScholarshipReducer,
  SchoolReducer,
  DegreelevelReducer,
  PaymentReducer,
  InstitutesReducer,
  DepartmentReducer,
  CenterReducer,
  CountryReducer,
  NewsReducer,
  TrainningPointReducer,
  StudyProcessReducer,
});

export default rootReducer;
