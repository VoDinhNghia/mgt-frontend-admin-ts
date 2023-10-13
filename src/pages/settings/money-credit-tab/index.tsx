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
  TableRow,
  TableCell,
} from "@mui/material";
import AddAndSearchTable from "../../commons/add-search-table";
import ModalMoneyCreditPage from "./modals";
import HeaderTableCommon from "../../commons/header-table";
import PaginationTableCommon from "../../commons/pagination-table";
import ActionTableCommon from "../../commons/actions-table";

const MoneyCreditTabPage = (props: IpropMoneyCredit) => {
  const { dispatch, listMoneyCredits = [], totalMoneyCredits = 0 } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    rowData: {},
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
    rowData,
  } = state;

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
          <HeaderTableCommon headerList={columns} />
          <TableBody>
            {listMoneyCredits?.map(
              (row: IrowTableMoneyCredit, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="text-primary">{row?.name}</TableCell>
                    <TableCell>
                      {row?.moneyPerCredit?.toLocaleString("en-US")} đ
                    </TableCell>
                    <TableCell>{`${row?.semester?.name} (${row?.semester?.year})`}</TableCell>
                    <TableCell>
                      <ActionTableCommon
                        state={state}
                        setState={setState}
                        rowData={row}
                        isPermissionDelete={isPermissionDelete}
                        isPermissionUpdate={isPermissionUpdate}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTableCommon
        total={totalMoneyCredits}
        limit={limit}
        page={page}
        setState={setState}
        state={state}
        fetchList={(page: number, limit: number) =>
          fetchMoneyCredit(page, limit)
        }
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
        moneyCreditInfo={rowData}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        fetchMoneyCredit={() => fetchMoneyCredit(page + 1, limit)}
      />
      <ModalMoneyCreditPage
        type={modalTypes.DELETE}
        isShowModal={isShowModalDelete}
        moneyCreditInfo={rowData}
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
