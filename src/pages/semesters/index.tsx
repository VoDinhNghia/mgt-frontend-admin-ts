import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import {
  IpropSemester,
  IrowTableSemester,
} from "../../interfaces/semester.interface";
import { semesterActions } from "../../store/actions";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { headerTableSemesters } from "../../utils/semester.util";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import AddAndSearchTable from "../commons/add-search-table";
import ModalSemesterPage from "./modals";

const SemesterMgtPage = (props: IpropSemester) => {
  const { dispatch, listSemesters = [], totalSemester = 0 } = props;
  const isAccess = validateAccessModule(moduleNames.SEMESTERS_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.SEMESTERS_MANAGEMENT
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.SEMESTERS_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.SEMESTERS_MANAGEMENT
  );
  const [state, setState] = useState({
    page: 0,
    limit: 10,
    semesterInfo: {},
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
  });
  const {
    page,
    limit,
    isShowModalAdd,
    isShowModalDelete,
    isShowModalUpdate,
    semesterInfo,
  } = state;

  const handleChangePage = (event: unknown, newPage: number) => {
    setState({ ...state, page: newPage });
    fetchSemesters(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setState({ ...state, limit: newLimit });
    fetchSemesters(1, newLimit);
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: semesterActions.GET_LIST_SEMESTER,
      payload: {
        searchKey,
      },
    });
  };

  const fetchSemesters = (page: number, limit: number) => {
    dispatch({
      type: semesterActions.GET_LIST_SEMESTER,
      payload: {
        page,
        limit,
      },
    });
  };

  useEffect(() => {
    fetchSemesters(page + 1, limit);
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
                title="Add semester"
                titleSearch="Search by name and year..."
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              <TableContainer>
                <Table stickyHeader aria-label="semester table">
                  <TableHead>
                    <TableRow>
                      {headerTableSemesters?.map((column, index) => (
                        <TableCell
                          key={`${index}-${column.label}`}
                          className="bg-success text-white"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listSemesters?.map(
                      (semester: IrowTableSemester, index: number) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={semester?._id}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="text-primary">
                              {semester?.name}
                            </TableCell>
                            <TableCell>{semester?.year}</TableCell>
                            <TableCell>{semester?.code}</TableCell>
                            <TableCell>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                disabled={!isPermissionUpdate}
                                onClick={() =>
                                  setState({
                                    ...state,
                                    isShowModalUpdate: true,
                                    semesterInfo: semester,
                                  })
                                }
                              >
                                <BsPencilSquare />
                              </Button>{" "}
                              <Button
                                variant="outline-danger"
                                size="sm"
                                disabled={!isPermissionDelete}
                                onClick={() =>
                                  setState({
                                    ...state,
                                    isShowModalDelete: true,
                                    semesterInfo: semester,
                                  })
                                }
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
                count={totalSemester}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <ModalSemesterPage
                type={modalTypes.ADD}
                isShowModal={isShowModalAdd}
                semesterInfo={{}}
                onCloseModal={() =>
                  setState({ ...state, isShowModalAdd: false })
                }
                fetchSemesters={() => fetchSemesters(page + 1, limit)}
              />
              <ModalSemesterPage
                type={modalTypes.UPDATE}
                isShowModal={isShowModalUpdate}
                semesterInfo={semesterInfo}
                onCloseModal={() =>
                  setState({ ...state, isShowModalUpdate: false })
                }
                fetchSemesters={() => fetchSemesters(page + 1, limit)}
              />
              <ModalSemesterPage
                type={modalTypes.DELETE}
                isShowModal={isShowModalDelete}
                semesterInfo={semesterInfo}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDelete: false })
                }
                fetchSemesters={() => fetchSemesters(page + 1, limit)}
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
    listSemesters: state.SemesterReducer.listSemesters,
    totalSemester: state.SemesterReducer.totalSemester,
  };
};

export default connect(mapStateToProps)(SemesterMgtPage);
