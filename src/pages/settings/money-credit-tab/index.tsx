import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  IpropMoneyCredit,
  IrowTableMoneyCredit,
} from "../../../interfaces/setting.interface";
import { IstateRedux } from "../../../interfaces/common.interface";
import { settingActions } from "../../../store/actions";
import { headerTableMoneyCredit } from "../../../utils/setting.util";
import { validateAction } from "../../../utils/permission.util";
import { moduleNames, permissonTypes } from "../../../constants/constant";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Button } from "react-bootstrap";
import AddAndSearchTable from "../../commons/add-search-table";

const MoneyCreditTabPage = (props: IpropMoneyCredit) => {
  const { dispatch, listMoneyCredits = [], totalMoneyCredits = 0 } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
  });
  const columns = headerTableMoneyCredit;
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.SETTINGS
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.SETTINGS
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.SETTINGS
  );
  const { page, limit } = state;

  const handleChangePage = (event: unknown, newPage: number) => {
    setState({ ...state, page: newPage });
    fetchMoneyCredit(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setState({ ...state, limit: newLimit });
    fetchMoneyCredit(1, newLimit);
  };

  const fetchMoneyCredit = (page: number, limit: number) => {
    dispatch({
      type: settingActions.GET_LIST_MONEY_CREDIT,
      payload: {
        page,
        limit,
      },
    });
  };

  useEffect(() => {
    fetchMoneyCredit(page + 1, limit);
  }, []);

  return (
    <div>
      <AddAndSearchTable isDisableBtnAdd={!isPermissionAdd} title="Add new" />
      <TableContainer>
        <Table stickyHeader aria-label="table money credit">
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
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
            {listMoneyCredits?.map(
              (row: IrowTableMoneyCredit, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.moneyPerCredit}</TableCell>
                    <TableCell>{row?.semester?.name}</TableCell>
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
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalMoneyCredits}
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
    listMoneyCredits: state.SettingReducer.listMoneyCredits,
    totalMoneyCredits: state.SettingReducer.totalMoneyCredit,
  };
};

export default connect(mapStateToProps)(MoneyCreditTabPage);
