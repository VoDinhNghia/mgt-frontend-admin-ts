import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga.user";
import PermissionSaga from "./permissions/saga.permission";
import RoomSaga from "./rooms/saga.room";
import FacultySaga from "./faculties/saga.faculty";
import SettingSaga from "./settings/saga.setting";
import AwardSaga from "./awards/saga.award";
import BranchSaga from "./branchs/saga.branch";
import CourseSaga from "./courses/saga.course";
import ClassSubjectSaga from "./class-subject/saga.class-subject";
import UnionSaga from "./unions/saga.union";
import SemesterSaga from "./semesters/saga.semester";
import PaymentSaga from "./payments/saga.payment";
import InstitutesSaga from "./institutes/saga.institutes";
import ScholarshipSaga from "./scholarships/saga.scholarship";
import SchoolSaga from "./school/saga.school";
import DepartmentSaga from "./departments/saga.department";
import DegreelevelSaga from "./degreelevels/saga.degreelevel";
import CenterSaga from "./centers/saga.center";
import CountrySaga from "./countries/saga.countries";
import NewsSaga from "./news/saga.news";
import TrainningPointSaga from "./trainning-point/saga.trainning-point";

function* rootSaga() {
  yield all([
    fork(UserSaga),
    fork(PermissionSaga),
    fork(RoomSaga),
    fork(FacultySaga),
    fork(SettingSaga),
    fork(AwardSaga),
    fork(BranchSaga),
    fork(CourseSaga),
    fork(ClassSubjectSaga),
    fork(UnionSaga),
    fork(SemesterSaga),
    fork(PaymentSaga),
    fork(InstitutesSaga),
    fork(ScholarshipSaga),
    fork(SchoolSaga),
    fork(DepartmentSaga),
    fork(DegreelevelSaga),
    fork(CenterSaga),
    fork(CountrySaga),
    fork(NewsSaga),
    fork(TrainningPointSaga),
  ]);
}

export default rootSaga;
