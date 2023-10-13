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
  TableRow,
  TableCell,
} from "@mui/material";
import { headerTableSemesters } from "../../utils/semester.util";
import AddAndSearchTable from "../commons/add-search-table";
import ModalSemesterPage from "./modals";
import HeaderTableCommon from "../commons/header-table";
import PaginationTableCommon from "../commons/pagination-table";
import ActionTableCommon from "../commons/actions-table";

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
    rowData: {},
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
    rowData,
  } = state;

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
                  <HeaderTableCommon headerList={headerTableSemesters} />
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
                              <ActionTableCommon
                                state={state}
                                setState={setState}
                                isPermissionDelete={isPermissionDelete}
                                isPermissionUpdate={isPermissionUpdate}
                                rowData={semester}
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
                total={totalSemester}
                limit={limit}
                page={page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchSemesters(page, limit)
                }
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
                semesterInfo={rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalUpdate: false })
                }
                fetchSemesters={() => fetchSemesters(page + 1, limit)}
              />
              <ModalSemesterPage
                type={modalTypes.DELETE}
                isShowModal={isShowModalDelete}
                semesterInfo={rowData}
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
