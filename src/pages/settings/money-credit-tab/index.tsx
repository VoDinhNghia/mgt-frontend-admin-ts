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
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
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
import ModalMoneyCreditPage from "./modals";

const MoneyCreditTabPage = (props: IpropMoneyCredit) => {
  const { dispatch, listMoneyCredits = [], totalMoneyCredits = 0 } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    moneyCreditInfo: {},
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
  const {
    page,
    limit,
    isShowModalAdd,
    isShowModalDelete,
    isShowModalUpdate,
    moneyCreditInfo,
  } = state;

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

  const onSearch = (searchKey: string) => {
    dispatch({
      type: settingActions.GET_LIST_MONEY_CREDIT,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchMoneyCredit(page + 1, limit);
  }, []);

  return (
    <div>
      <AddAndSearchTable
        isDisableBtnAdd={!isPermissionAdd}
        title="Add new"
        onSearch={(searchKey: string) => onSearch(searchKey)}
        onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
      />
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
                    <TableCell className="text-primary">{row?.name}</TableCell>
                    <TableCell>{row?.moneyPerCredit}</TableCell>
                    <TableCell>{row?.semester?.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={!isPermissionUpdate}
                        onClick={() =>
                          setState({
                            ...state,
                            isShowModalUpdate: true,
                            moneyCreditInfo: row,
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
                            moneyCreditInfo: row,
                          })
                        }
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
      <ModalMoneyCreditPage
        type={modalTypes.ADD}
        isShowModal={isShowModalAdd}
        moneyCreditInfo={{}}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
        fetchMoneyCredit={() => fetchMoneyCredit(page + 1, limit)}
      />
      <ModalMoneyCreditPage
        type={modalTypes.UPDATE}
        isShowModal={isShowModalUpdate}
        moneyCreditInfo={moneyCreditInfo}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        fetchMoneyCredit={() => fetchMoneyCredit(page + 1, limit)}
      />
      <ModalMoneyCreditPage
        type={modalTypes.DELETE}
        isShowModal={isShowModalDelete}
        moneyCreditInfo={moneyCreditInfo}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        fetchMoneyCredit={() => fetchMoneyCredit(page + 1, limit)}
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
