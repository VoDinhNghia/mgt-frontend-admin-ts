import React, { useState, useEffect } from "react";
import { validateAccessModule } from "../../utils/permission.util";
import { moduleNames } from "../../constants/constant";
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

const SemesterMgtPage = (props: IpropSemester) => {
  const { dispatch, listSemesters = [], totalSemester = 0 } = props;
  const isAccess = validateAccessModule(moduleNames.SEMESTERS_MANAGEMENT);
  const [state, setState] = useState({
    page: 0,
    limit: 10,
  });
  const { page, limit } = state;

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
                              <Button variant="outline-primary" size="sm">
                                <BsPencilSquare />
                              </Button>{" "}
                              <Button variant="outline-danger" size="sm">
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
