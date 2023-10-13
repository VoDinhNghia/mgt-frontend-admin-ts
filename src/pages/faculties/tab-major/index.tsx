import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ImajorReadMore,
  IpropMajorTab,
  IrowMajorTable,
} from "../../../interfaces/faculty.interface";
import {
  IallStateReadMore,
  IstateRedux,
} from "../../../interfaces/common.interface";
import { facultyActions } from "../../../store/actions";
import {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { headerTableMajor } from "../../../utils/faculty.util";
import { validateAction } from "../../../utils/permission.util";
import {
  formatDate,
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
import moment from "moment";
import { Button } from "react-bootstrap";
import MajorModalPage from "./modals";
import AddAndSearchTable from "../../commons/add-search-table";
import ReadMoreCommon from "../../commons/readmore";
import HeaderTableCommon from "../../commons/header-table";
import PaginationTableCommon from "../../commons/pagination-table";
import ActionTableCommon from "../../commons/actions-table";

const MajorTabPage = (props: IpropMajorTab) => {
  const { dispatch, listMajors = [], totalMajor = 0 } = props;
  const [state, setState] = useState({
    isShowModalAdd: false,
    isShowModalDelete: false,
    isShowModalUpdate: false,
    rowData: {},
    page: 0,
    limit: 10,
    readMore: {},
  });

  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.FACULTIES_MANAGEMENT
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.FACULTIES_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.FACULTIES_MANAGEMENT
  );
  const columns = headerTableMajor();
  const {
    isShowModalAdd,
    isShowModalDelete,
    isShowModalUpdate,
    page,
    limit,
    rowData = {},
    readMore = {},
  } = state;
  const allStateReadMore: IallStateReadMore = readMore;
  const majorReadMore: ImajorReadMore = rowData;

  const fetchMajors = (page: number, limit: number) => {
    dispatch({
      type: facultyActions.GET_LIST_MAJOR,
      payload: {
        page,
        limit,
      },
    });
  };

  const handleReadMore = (majorInfo: ImajorReadMore) => {
    const isReadMore = allStateReadMore[`${majorInfo?._id}`];
    setState({
      ...state,
      readMore: { [`${majorInfo?._id}`]: !isReadMore },
      rowData,
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: facultyActions.GET_LIST_MAJOR,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchMajors(page + 1, limit);
  }, []);

  return (
    <div>
      <AddAndSearchTable
        isDisableBtnAdd={!isPermissionAdd}
        title="Add major"
        onSearch={(searchKey: string) => onSearch(searchKey)}
        onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
      />
      <TableContainer>
        <Table stickyHeader aria-lable="major table">
          <HeaderTableCommon headerList={columns} />
          <TableBody>
            {listMajors?.map((major: IrowMajorTable, index: number) => {
              return (
                <TableRow hover tabIndex={-1} key={major?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="text-primary">{major?.name}</TableCell>
                  <TableCell>
                    <ReadMoreCommon
                      isReadMore={
                        major?._id === majorReadMore?._id
                          ? allStateReadMore[`${major?._id}`]
                          : false
                      }
                      setReadMore={() => handleReadMore(major)}
                      lengthSlice={20}
                    >
                      {major?.introduction}
                    </ReadMoreCommon>
                  </TableCell>
                  <TableCell>
                    {moment(major?.foundYear).format(formatDate)}
                  </TableCell>
                  <TableCell className="text-primary">
                    {major?.faculty?.name}
                  </TableCell>
                  <TableCell className="text-primary">{`${major?.headOfSection?.lastName} ${major?.headOfSection?.middleName} ${major?.headOfSection?.firstName}`}</TableCell>
                  <TableCell className="text-primary">{`${major?.eputeHead?.lastName} ${major?.eputeHead?.middleName} ${major?.eputeHead?.firstName}`}</TableCell>
                  <TableCell>
                    <Button variant="outline-primary" size="sm">
                      Detail
                    </Button>
                  </TableCell>
                  <TableCell>
                    <ActionTableCommon
                      state={state}
                      setState={setState}
                      rowData={major}
                      isPermissionDelete={isPermissionDelete}
                      isPermissionUpdate={isPermissionUpdate}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTableCommon
        total={totalMajor}
        page={page}
        limit={limit}
        setState={setState}
        state={state}
        fetchList={(page: number, limit: number) => fetchMajors(page, limit)}
      />
      <MajorModalPage
        type={modalTypes.ADD}
        isShowModal={isShowModalAdd}
        majorInfo={{}}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
        fetchMajors={() => fetchMajors(page + 1, limit)}
      />
      <MajorModalPage
        type={modalTypes.UPDATE}
        isShowModal={isShowModalUpdate}
        majorInfo={rowData}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        fetchMajors={() => fetchMajors(page + 1, limit)}
      />
      <MajorModalPage
        type={modalTypes.DELETE}
        isShowModal={isShowModalDelete}
        majorInfo={rowData}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        fetchMajors={() => fetchMajors(page + 1, limit)}
      />
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listMajors: state.FacultyReducer.listMajors,
    totalMajor: state.FacultyReducer.totalMajor,
  };
};

export default connect(mapStateToProps)(MajorTabPage);
