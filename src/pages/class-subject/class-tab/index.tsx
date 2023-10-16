import React, { useEffect, useState } from "react";
import {
  IpropsClassTab,
  IrowClassTable,
} from "../../../interfaces/class-subject.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { classSubjectActions } from "../../../store/actions";
import HeaderTableCommon from "../../commons/header-table";
import PaginationTableCommon from "../../commons/pagination-table";
import ActionTableCommon from "../../commons/actions-table";
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { headerTableClass } from "../../../utils/class-subject.util";
import { validateAction } from "../../../utils/permission.util";
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
import AddAndSearchTable from "../../commons/add-search-table";
import ModalClassPage from "./modals";

const ClassTabMgtPage = (props: IpropsClassTab) => {
  const {
    listClasses = [],
    totalClass = 0,
    dispatch,
    userOptions = [],
    majorOptions = [],
    degreeLevelOptions = [],
    courseOptions = [],
  } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 5,
    rowData: {},
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
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
    isShowModalAdd,
    isShowModalDelete,
    isShowModalUpdate,
    rowData,
  } = state;

  const fetchClasses = (page: number, limit: number) => {
    dispatch({
      type: classSubjectActions.GET_LIST_CLASS,
      payload: {
        page,
        limit,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: classSubjectActions.GET_LIST_CLASS,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchClasses(page + 1, limit);
  }, []);

  return (
    <div>
      <AddAndSearchTable
        isDisableBtnAdd={!isPermissionAdd}
        title="Add class"
        onSearch={(searchKey: string) => onSearch(searchKey)}
        onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
      />
      <TableContainer>
        <Table stickyHeader aria-label="class table">
          <HeaderTableCommon headerList={headerTableClass} />
          <TableBody>
            {listClasses.map((classes: IrowClassTable, index: number) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={classes?._id}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="text-primary">
                    {classes?.name}
                  </TableCell>
                  <TableCell>{classes?.classSize}</TableCell>
                  <TableCell className="text-primary">
                    {classes?.major?.name}
                  </TableCell>
                  <TableCell>{classes?.degreeLevel?.name}</TableCell>
                  <TableCell>{classes?.course?.name}</TableCell>
                  <TableCell className="text-primary">{`${classes?.homeroomteacher?.lastName} ${classes?.homeroomteacher?.middleName} ${classes?.homeroomteacher?.firstName}`}</TableCell>
                  <TableCell>
                    <ActionTableCommon
                      isPermissionDelete={isPermissionDelete}
                      isPermissionUpdate={isPermissionUpdate}
                      state={state}
                      setState={setState}
                      rowData={classes}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTableCommon
        total={totalClass}
        limit={limit}
        page={page}
        setState={setState}
        state={state}
        fetchList={(page: number, limit: number) => fetchClasses(page, limit)}
      />
      <ModalClassPage
        isShowModal={isShowModalAdd}
        type={modalTypes.ADD}
        classInfo={{}}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
        fetchClasses={() => fetchClasses(page + 1, limit)}
        userOptions={userOptions}
        courseOptions={courseOptions}
        degreeLevelOptions={degreeLevelOptions}
        majorOptions={majorOptions}
      />
      <ModalClassPage
        isShowModal={isShowModalUpdate}
        type={modalTypes.UPDATE}
        classInfo={rowData}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        fetchClasses={() => fetchClasses(page + 1, limit)}
        userOptions={userOptions}
        courseOptions={courseOptions}
        degreeLevelOptions={degreeLevelOptions}
        majorOptions={majorOptions}
      />
      <ModalClassPage
        isShowModal={isShowModalDelete}
        type={modalTypes.DELETE}
        classInfo={rowData}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        fetchClasses={() => fetchClasses(page + 1, limit)}
      />
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listClasses: state.ClassSubjectReducer.listClasses,
    totalClass: state.ClassSubjectReducer.totalClass,
  };
};

export default connect(mapStateToProps)(ClassTabMgtPage);
