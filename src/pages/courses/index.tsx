import React, { useEffect, useState } from "react";
import {
  validateAccessModule,
  validateAction,
} from "../../utils/permission.util";
import { moduleNames, permissonTypes } from "../../constants/constant";
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
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { headerTableCourse } from "../../utils/course.util";
import AddAndSearchTable from "../commons/add-search-table";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const CourseMgtPage = (props: IpropCourse) => {
  const { listCourses = [], totalCourse = 0, dispatch } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
    isShowModalAdd: false,
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
  const { page, limit } = state;

  const onSearch = (searchKey: string) => {
    dispatch({
      type: courseActions.GET_LIST_COURSE,
      payload: {
        searchKey,
      },
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setState({ ...state, page: newPage });
    fetchCourses(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setState({ ...state, limit: newLimit });
    fetchCourses(1, newLimit);
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
              <AddAndSearchTable
                isDisableBtnAdd={!isPermissionAdd}
                title="Add course"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              <TableContainer>
                <Table stickyHeader aria-label="course table">
                  <TableHead>
                    <TableRow>
                      {headerTableCourse?.map((column, index) => (
                        <TableCell
                          key={`${index}-${column.id}`}
                          className="bg-success text-white"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
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
                              <Button
                                variant="outline-primary"
                                size="sm"
                                disabled={!isPermissionUpdate}
                              >
                                <BsPencilSquare />
                              </Button>{" "}
                              <Button
                                variant="outline-danger"
                                size="sm"
                                disabled={!isPermissionDelete}
                              >
                                <BsTrash />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCourse}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
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
