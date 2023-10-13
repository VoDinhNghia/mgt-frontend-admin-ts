import React, { useEffect, useState } from "react";
import {
  IfacultyReadMore,
  IpropFacultyTab,
  IrowFacutyTable,
} from "../../../interfaces/faculty.interface";
import { connect } from "react-redux";
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
import { headerTableFaculty } from "../../../utils/faculty.util";
import moment from "moment";
import {
  formatDate,
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
import { Button } from "react-bootstrap";
import { validateAction } from "../../../utils/permission.util";
import AddAndSearchTable from "../../commons/add-search-table";
import ModalFacultyPage from "./modals";
import ReadMoreCommon from "../../commons/readmore";
import HeaderTableCommon from "../../commons/header-table";
import PaginationTableCommon from "../../commons/pagination-table";
import ActionTableCommon from "../../commons/actions-table";

const FacultyTabPage = (props: IpropFacultyTab) => {
  const { listFaculties = [], dispatch, totalFaculty = 0 } = props;
  const [state, setState] = useState({
    isShowModalAdd: false,
    isShowModalDelete: false,
    isShowModalUpdate: false,
    limit: 10,
    page: 0,
    rowData: {},
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
  const columns = headerTableFaculty();

  const {
    page,
    limit,
    isShowModalAdd,
    rowData,
    isShowModalDelete,
    isShowModalUpdate,
    readMore,
  } = state;

  const allStateReadMore: IallStateReadMore = readMore;
  const facultyReadMore: IfacultyReadMore = rowData;

  const fetchFaculties = (page: number, limit: number) => {
    dispatch({
      type: facultyActions.GET_LIST_FACULTY,
      payload: {
        limit,
        page,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: facultyActions.GET_LIST_FACULTY,
      payload: {
        searchKey,
      },
    });
  };

  const handleReadMore = (facultyInfo: IfacultyReadMore) => {
    const isReadMore = allStateReadMore[`${facultyInfo?._id}`];
    setState({
      ...state,
      readMore: { [`${facultyInfo?._id}`]: !isReadMore },
      rowData: facultyInfo,
    });
  };

  useEffect(() => {
    fetchFaculties(page + 1, limit);
  }, []);

  return (
    <div>
      <AddAndSearchTable
        isDisableBtnAdd={!isPermissionAdd}
        title="Add faculty"
        onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
        onSearch={(searchKey: string) => onSearch(searchKey)}
      />
      <TableContainer>
        <Table stickyHeader aria-label="faculty table">
          <HeaderTableCommon headerList={columns} />
          <TableBody>
            {listFaculties?.map((faculty: IrowFacutyTable, index: number) => {
              return (
                <TableRow hover tabIndex={-1} key={faculty?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="text-primary">
                    {faculty?.name}
                  </TableCell>
                  <TableCell>
                    <ReadMoreCommon
                      isReadMore={
                        faculty?._id === facultyReadMore?._id
                          ? allStateReadMore[`${faculty?._id}`]
                          : false
                      }
                      setReadMore={() => handleReadMore(faculty)}
                      lengthSlice={20}
                    >
                      {faculty?.introduction}
                    </ReadMoreCommon>
                  </TableCell>
                  <TableCell>
                    {moment(faculty?.foundYear).format(formatDate)}
                  </TableCell>
                  <TableCell className="text-primary">
                    {`${faculty?.headOfSection?.lastName || ""} ${
                      faculty?.headOfSection?.middleName || ""
                    } ${faculty?.headOfSection?.firstName || ""}`}
                  </TableCell>
                  <TableCell className="text-primary">
                    {`${faculty?.eputeHead?.lastName || ""} ${
                      faculty?.eputeHead?.middleName || ""
                    } ${faculty?.eputeHead?.firstName || ""}`}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline-primary" size="sm">
                      Detail
                    </Button>
                  </TableCell>
                  <TableCell>
                    <ActionTableCommon
                      state={state}
                      setState={setState}
                      rowData={faculty}
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
        total={totalFaculty}
        page={page}
        limit={limit}
        setState={setState}
        state={state}
        fetchList={(page: number, limit: number) => fetchFaculties(page, limit)}
      />
      <ModalFacultyPage
        type={modalTypes.ADD}
        isShowModal={isShowModalAdd}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
        facultyInfo={{}}
        fetchFaculties={() => fetchFaculties(page + 1, limit)}
      />
      <ModalFacultyPage
        type={modalTypes.UPDATE}
        isShowModal={isShowModalUpdate}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        facultyInfo={rowData}
        fetchFaculties={() => fetchFaculties(page + 1, limit)}
      />
      <ModalFacultyPage
        type={modalTypes.DELETE}
        isShowModal={isShowModalDelete}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        facultyInfo={rowData}
        fetchFaculties={() => fetchFaculties(page + 1, limit)}
      />
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listFaculties: state.FacultyReducer.listFaculties,
    totalFaculty: state.FacultyReducer.totalFaculty,
  };
};

export default connect(mapStateToProps)(FacultyTabPage);
