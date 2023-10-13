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
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import AddAndSearchTable from "../../commons/add-search-table";
import { validateAction } from "../../../utils/permission.util";
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
import LearningRateModalPage from "./modals";
import HeaderTableCommon from "../../commons/header-table";

const LearningRateTabPage = (props: IpropLearningRate) => {
  const { listLearningRates = [], dispatch, totalLearningRate = 0 } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    learningRateInfo: {},
  });
  const columns = headerTableLearningRate;
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
    learningRateInfo,
  } = state;

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

  const onSearch = (searchKey: string) => {
    dispatch({
      type: settingActions.GET_LIST_LEARNING_RATE,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchLearningRate(page + 1, limit);
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
        <Table stickyHeader aria-label="learningrate table">
          <HeaderTableCommon headerList={columns} />
          <TableBody>
            {listLearningRates?.map(
              (row: IrowTableLearningRate, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="text-primary">{row?.name}</TableCell>
                    <TableCell>{row?.type}</TableCell>
                    <TableCell>{row?.minimum}</TableCell>
                    <TableCell>{row?.maximum}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={!isPermissionUpdate}
                        onClick={() =>
                          setState({
                            ...state,
                            isShowModalUpdate: true,
                            learningRateInfo: row,
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
                            learningRateInfo: row,
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
        count={totalLearningRate}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <LearningRateModalPage
        isShowModal={isShowModalAdd}
        type={modalTypes.ADD}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
        learningRateInfo={{}}
        fetchLearningRate={() => fetchLearningRate(page + 1, limit)}
      />
      <LearningRateModalPage
        isShowModal={isShowModalUpdate}
        type={modalTypes.UPDATE}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        learningRateInfo={learningRateInfo}
        fetchLearningRate={() => fetchLearningRate(page + 1, limit)}
      />
      <LearningRateModalPage
        isShowModal={isShowModalDelete}
        type={modalTypes.DELETE}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        learningRateInfo={learningRateInfo}
        fetchLearningRate={() => fetchLearningRate(page + 1, limit)}
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
