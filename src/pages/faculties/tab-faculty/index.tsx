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
  TableHead,
  TableBody,
  Table,
  TablePagination,
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
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { validateAction } from "../../../utils/permission.util";
import AddAndSearchTable from "../../commons/add-search-table";
import ModalFacultyPage from "./modals";
import ReadMoreCommon from "../../commons/readmore";

const FacultyTabPage = (props: IpropFacultyTab) => {
  const { listFaculties = [], dispatch, totalFaculty = 0 } = props;
  const [state, setState] = useState({
    isShowModalAdd: false,
    isShowModalDelete: false,
    isShowModalUpdate: false,
    limit: 10,
    page: 0,
    facultyInfo: {},
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
    facultyInfo,
    isShowModalDelete,
    isShowModalUpdate,
    readMore,
  } = state;

  const allStateReadMore: IallStateReadMore = readMore;
  const facultyReadMore: IfacultyReadMore = facultyInfo;

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setState({ ...state, page: newPage });
    fetchFaculties(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setState({ ...state, limit: newLimit });
    fetchFaculties(1, newLimit);
  };

  const handleReadMore = (facultyInfo: IfacultyReadMore) => {
    const isReadMore = allStateReadMore[`${facultyInfo?._id}`];
    setState({
      ...state,
      readMore: { [`${facultyInfo?._id}`]: !isReadMore },
      facultyInfo,
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
          <TableHead>
            <TableRow className="fs-6">
              {columns.map((column, index) => (
                <TableCell
                  key={`${index}-${column.label}`}
                  className="bg-success text-white"
                  style={column.id === "actions" ? { width: column.minWidth } : undefined}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
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
                    <Button
                      variant="outline-primary"
                      size="sm"
                      disabled={!isPermissionUpdate}
                      onClick={() =>
                        setState({
                          ...state,
                          isShowModalUpdate: true,
                          facultyInfo: faculty,
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
                          facultyInfo: faculty,
                        })
                      }
                    >
                      <BsTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalFaculty}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalFacultyPage
        type={modalTypes.ADD}
        isShowModal={isShowModalAdd}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
        facultyInfo={facultyInfo}
        fetchFaculties={() => fetchFaculties(page + 1, limit)}
      />
      <ModalFacultyPage
        type={modalTypes.UPDATE}
        isShowModal={isShowModalUpdate}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        facultyInfo={facultyInfo}
        fetchFaculties={() => fetchFaculties(page + 1, limit)}
      />
      <ModalFacultyPage
        type={modalTypes.DELETE}
        isShowModal={isShowModalDelete}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        facultyInfo={facultyInfo}
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
