import { takeLatest } from "redux-saga/effects";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
} from "../../services/course.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { courseActions } from "../actions";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addCourse(params: IparamSaga) {
  yield addSagaCommon(createCourse, params, "Add course");
}

function* editCourse(params: IparamSaga) {
  yield updateSagaCommon(updateCourse, params, "Update course");
}

function* removeCourse(params: IparamSaga) {
  yield removeSagaCommon(deleteCourse, params, "Delete course");
}

function* fetchCourses(params: IparamSaga) {
  yield fetchListSagaCommon(
    getCourses,
    courseActions.GET_LIST_COURSE_SUCCESS,
    "Get list courses",
    params
  );
}

function* CourseSaga() {
  yield takeLatest<ItakeLatestSaga>(courseActions.ADD_COURSE, addCourse);
  yield takeLatest<ItakeLatestSaga>(courseActions.UPDATE_COURSE, editCourse);
  yield takeLatest<ItakeLatestSaga>(courseActions.DELETE_COURSE, removeCourse);
  yield takeLatest<ItakeLatestSaga>(
    courseActions.GET_LIST_COURSE,
    fetchCourses
  );
}

export default CourseSaga;
