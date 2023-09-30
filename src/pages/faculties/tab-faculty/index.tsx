import React, { useEffect } from "react";
import {
  IpropFacultyTab,
  IrowFacutyTable,
} from "../../../interfaces/faculty.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { facultyActions } from "../../../store/actions";
import {
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
} from "@mui/material";
import { headerTableFaculty } from "../../../utils/faculty.util";
import moment from "moment";
import {
  formatDate,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { validateAction } from "../../../utils/permission.util";

const FacultyTabPage = (props: IpropFacultyTab) => {
  const { listFaculties = [], dispatch } = props;
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.FACULTIES_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.FACULTIES_MANAGEMENT
  );
  const columns = headerTableFaculty();

  const fetchFaculties = () => {
    dispatch({
      type: facultyActions.GET_LIST_FACULTY,
      payload: {
        limit: 10,
        page: 1,
      },
    });
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  return (
    <TableContainer>
      <Table stickyHeader aria-label="faculty table">
        <TableHead>
          <TableRow className="fs-6">
            {columns.map((column, index) => (
              <TableCell
                key={`${index}-${column.label}`}
                className="bg-primary text-white"
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
                <TableCell className="text-primary">{faculty?.name}</TableCell>
                <TableCell>{faculty?.introduction}</TableCell>
                <TableCell>
                  {moment(faculty?.foundYear).format(formatDate)}
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
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listFaculties: state.FacultyReducer.listFaculties,
    totalFaculty: state.FacultyReducer.totalFaculty,
  };
};

export default connect(mapStateToProps)(FacultyTabPage);
