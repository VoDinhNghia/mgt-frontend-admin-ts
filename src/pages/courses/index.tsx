import React, { useEffect, useState } from "react";
import {
  validateAccessModule,
  validateAction,
} from "../../utils/permission.util";
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import {
  IpropCourse,
  IrowTableCourse,
} from "../../interfaces/course.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { courseActions } from "../../store/actions";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { headerTableCourse } from "../../utils/course.util";
import AddAndSearchTable from "../commons/add-search-table";
import HeaderTableCommon from "../commons/header-table";
import PaginationTableCommon from "../commons/pagination-table";
import ActionTableCommon from "../commons/actions-table";
import ModalCoursePage from "./modals";
import TitleHeaderPage from "../commons/title-header";

const CourseMgtPage = (props: IpropCourse) => {
  const { listCourses = [], totalCourse = 0, dispatch } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 5,
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    rowData: {},
  });
  const isAccess = validateAccessModule(moduleNames.COURSE_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.COURSE_MANAGEMENT
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.COURSE_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.COURSE_MANAGEMENT
  );
  const {
    page,
    limit,
    rowData,
    isShowModalAdd,
    isShowModalDelete,
    isShowModalUpdate,
  } = state;

  const onSearch = (searchKey: string) => {
    dispatch({
      type: courseActions.GET_LIST_COURSE,
      payload: {
        searchKey,
      },
    });
  };

  const fetchCourses = (page: number, limit: number) => {
    dispatch({
      type: courseActions.GET_LIST_COURSE,
      payload: {
        limit,
        page,
      },
    });
  };

  useEffect(() => {
    fetchCourses(page + 1, limit);
  }, []);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <TitleHeaderPage title="Course management page"/>
              <AddAndSearchTable
                isDisableBtnAdd={!isPermissionAdd}
                title="Add course"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              <TableContainer>
                <Table stickyHeader aria-label="course table">
                  <HeaderTableCommon headerList={headerTableCourse} />
                  <TableBody>
                    {listCourses?.map(
                      (course: IrowTableCourse, index: number) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={course?._id}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="text-primary">
                              {course?.name}
                            </TableCell>
                            <TableCell>{course?.year}</TableCell>
                            <TableCell>{course?.total}</TableCell>
                            <TableCell>
                              <ActionTableCommon
                                state={state}
                                setState={setState}
                                rowData={course}
                                isPermissionDelete={isPermissionDelete}
                                isPermissionUpdate={isPermissionUpdate}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <PaginationTableCommon
                total={totalCourse}
                limit={limit}
                page={page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchCourses(page, limit)
                }
              />
              <ModalCoursePage
                type={modalTypes.ADD}
                courseInfo={{}}
                isShowModal={isShowModalAdd}
                onCloseModal={() =>
                  setState({ ...state, isShowModalAdd: false })
                }
                fetchCourses={() => fetchCourses(page + 1, limit)}
              />
              <ModalCoursePage
                type={modalTypes.UPDATE}
                courseInfo={rowData}
                isShowModal={isShowModalUpdate}
                onCloseModal={() =>
                  setState({ ...state, isShowModalUpdate: false })
                }
                fetchCourses={() => fetchCourses(page + 1, limit)}
              />
              <ModalCoursePage
                type={modalTypes.DELETE}
                courseInfo={rowData}
                isShowModal={isShowModalDelete}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDelete: false })
                }
                fetchCourses={() => fetchCourses(page + 1, limit)}
              />
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
    listCourses: state.CourseReducer.listCourses,
    totalCourse: state.CourseReducer.totalCourse,
  };
};

export default connect(mapStateToProps)(CourseMgtPage);
