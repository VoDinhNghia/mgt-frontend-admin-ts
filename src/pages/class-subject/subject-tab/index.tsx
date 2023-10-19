import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import {
  IpropsSubjectTab,
  IrowSubjectTable,
} from "../../../interfaces/class-subject.interface";
import { validateAction } from "../../../utils/permission.util";
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
import { classSubjectActions } from "../../../store/actions";
import { Box, Table, TableBody, TableRow, TableCell } from "@mui/material";
import HeaderTableCommon from "../../commons/header-table";
import PaginationTableCommon from "../../commons/pagination-table";
import ActionTableCommon from "../../commons/actions-table";
import AddAndSearchTable from "../../commons/add-search-table";
import { headerTableSubject } from "../../../utils/class-subject.util";
import { Button } from "react-bootstrap";
import ModalSubjectPage from "./modals";

const SubjectTabMgtPage = (props: IpropsSubjectTab) => {
  const {
    dispatch,
    listSubjects = [],
    totalSubject = 0,
    degreeLevelOptions = [],
    majorOptions = [],
    userOptions = [],
    courseOptions = [],
  } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 5,
    rowData: {},
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    isShowModalView: false,
  });
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.CLASS_SUBJECT_MANAGEMENT
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.CLASS_SUBJECT_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.CLASS_SUBJECT_MANAGEMENT
  );
  const {
    page,
    limit,
    isShowModalDelete,
    isShowModalAdd,
    isShowModalUpdate,
    isShowModalView,
    rowData,
  } = state;

  const fetchSubjects = (page: number, limit: number) => {
    dispatch({
      type: classSubjectActions.GET_LIST_SUBJECT,
      payload: {
        page,
        limit,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: classSubjectActions.GET_LIST_SUBJECT,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchSubjects(page + 1, limit);
  }, []);

  return (
    <div>
      <AddAndSearchTable
        isDisableBtnAdd={!isPermissionAdd}
        title="Add subject"
        onSearch={(key: string) => onSearch(key)}
        onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
      />
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <Table stickyHeader aria-label="subject table">
            <HeaderTableCommon headerList={headerTableSubject} />
            <TableBody>
              {listSubjects?.map((subject: IrowSubjectTable, index: number) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={subject?._id}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{subject?.name}</TableCell>
                    <TableCell>{`${subject?.semester?.name} (${subject?.semester?.year})`}</TableCell>
                    <TableCell>{subject?.major?.name}</TableCell>
                    <TableCell>{subject?.degreeLevel?.name}</TableCell>
                    <TableCell>{subject?.course?.name}</TableCell>
                    <TableCell>{`${subject?.lecturer?.lastName} ${subject?.lecturer?.middleName} ${subject?.lecturer?.firstName}`}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          setState({
                            ...state,
                            isShowModalView: true,
                            rowData: subject,
                          })
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <ActionTableCommon
                        isPermissionDelete={isPermissionDelete}
                        isPermissionUpdate={isPermissionUpdate}
                        setState={setState}
                        state={state}
                        rowData={subject}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <PaginationTableCommon
        total={totalSubject}
        limit={limit}
        page={page}
        setState={setState}
        state={state}
        fetchList={(page: number, limit: number) => fetchSubjects(page, limit)}
      />
      <ModalSubjectPage
        size="md"
        type={modalTypes.ADD}
        isShowModal={isShowModalAdd}
        subjectInfo={{}}
        degreeLevelOptions={degreeLevelOptions}
        courseOptions={courseOptions}
        majorOptions={majorOptions}
        userOptions={userOptions}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
        fetchSubjects={() => fetchSubjects(page + 1, limit)}
      />
      <ModalSubjectPage
        size="md"
        type={modalTypes.UPDATE}
        isShowModal={isShowModalUpdate}
        subjectInfo={rowData}
        degreeLevelOptions={degreeLevelOptions}
        courseOptions={courseOptions}
        majorOptions={majorOptions}
        userOptions={userOptions}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        fetchSubjects={() => fetchSubjects(page + 1, limit)}
      />
      <ModalSubjectPage
        type={modalTypes.DELETE}
        isShowModal={isShowModalDelete}
        subjectInfo={rowData}
        degreeLevelOptions={degreeLevelOptions}
        courseOptions={courseOptions}
        majorOptions={majorOptions}
        userOptions={userOptions}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        fetchSubjects={() => fetchSubjects(page + 1, limit)}
      />
      <ModalSubjectPage
        type={modalTypes.VIEW}
        size="md"
        isShowModal={isShowModalView}
        subjectInfo={rowData}
        onCloseModal={() => setState({ ...state, isShowModalView: false })}
      />
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listSubjects: state.ClassSubjectReducer.listSubjects,
    totalSubject: state.ClassSubjectReducer.totalSubject,
  };
};

export default connect(mapStateToProps)(SubjectTabMgtPage);
