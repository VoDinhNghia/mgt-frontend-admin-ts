import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  IpropMajorTab,
  IrowMajorTable,
} from "../../../interfaces/faculty.interface";
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
import { headerTableMajor } from "../../../utils/faculty-handle.util";
import { validateAction } from "../../../utils/permission-handle.util";
import {
  formatDate,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
import moment from "moment";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const MajorTabPage = (props: IpropMajorTab) => {
  const { dispatch, listMajors = [] } = props;
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.FACULTIES_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.FACULTIES_MANAGEMENT
  );
  const columns = headerTableMajor();

  const fetchMajors = () => {
    dispatch({
      type: facultyActions.GET_LIST_MAJOR,
      payload: {
        page: 1,
        limit: 10,
      },
    });
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  return (
    <TableContainer>
      <Table stickyHeader aria-lable="major table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={`${index}-${column.label}`}
                className="bg-primary text-white"
                style={column.id === "actions" ? { width: column.minWidth } : undefined}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listMajors?.map((major: IrowMajorTable, index: number) => {
            return (
              <TableRow hover tabIndex={-1} key={major?._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-primary">{major?.name}</TableCell>
                <TableCell>{major?.introduction}</TableCell>
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
                  <Button variant="outline-primary" size="sm" disabled={!isPermissionUpdate}>
                    <BsPencilSquare />
                  </Button>{" "}
                  <Button variant="outline-danger" size="sm" disabled={!isPermissionDelete}>
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
    listMajors: state.FacultyReducer.listMajors,
    totalMajor: state.FacultyReducer.totalMajor,
  };
};

export default connect(mapStateToProps)(MajorTabPage);
