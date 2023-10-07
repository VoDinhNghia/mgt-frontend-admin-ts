import React, { useEffect, useState } from "react";
import {
  IpropLearningRate,
  IrowTableLearningRate,
} from "../../../interfaces/setting.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { settingActions } from "../../../store/actions";
import { headerTableLearningRate } from "../../../utils/setting.util";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const LearningRateTabPage = (props: IpropLearningRate) => {
  const { listLearningRates = [], dispatch, totalLearningRate = 0 } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
  });
  const columns = headerTableLearningRate;
  const { page, limit } = state;

  const handleChangePage = (event: unknown, newPage: number) => {
    setState({ ...state, page: newPage });
    fetchLearningRate(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setState({ ...state, limit: newLimit });
    fetchLearningRate(1, newLimit);
  };

  const fetchLearningRate = (page: number, limit: number) => {
    dispatch({
      type: settingActions.GET_LIST_LEARNING_RATE,
      payload: {
        page,
        limit,
      },
    });
  };

  useEffect(() => {
    fetchLearningRate(page + 1, limit);
  }, []);

  return (
    <div>
      <TableContainer>
        <Table stickyHeader aria-label="learningrate table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`${index}-${column.id}`}
                  className="bg-success text-white"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listLearningRates?.map(
              (row: IrowTableLearningRate, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.type}</TableCell>
                    <TableCell>{row?.minimum}</TableCell>
                    <TableCell>{row?.maximum}</TableCell>
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
        count={totalLearningRate}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listLearningRates: state.SettingReducer.listLearningRates,
    totalLearningRate: state.SettingReducer.totalLearningRate,
  };
};

export default connect(mapStateToProps)(LearningRateTabPage);
