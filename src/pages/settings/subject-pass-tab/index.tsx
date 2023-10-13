import React, { useEffect, useState } from "react";
import {
  IpropSubjectPass,
  IrowTableSubjectPass,
} from "../../../interfaces/setting.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { settingActions } from "../../../store/actions";
import { validateAction } from "../../../utils/permission.util";
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../../constants/constant";
import { headerTableSubjectPass } from "../../../utils/setting.util";
import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import AddAndSearchTable from "../../commons/add-search-table";
import ModalSubjectPassPage from "./modals";
import HeaderTableCommon from "../../commons/header-table";
import PaginationTableCommon from "../../commons/pagination-table";

const SubjectPassTabPage = (props: IpropSubjectPass) => {
  const { dispatch, listSubjectPass = [], totalSubjectPass = 0 } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 10,
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    subjectPassInfo: {},
  });
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
  const columns = headerTableSubjectPass;
  const {
    page,
    limit,
    isShowModalAdd,
    isShowModalDelete,
    isShowModalUpdate,
    subjectPassInfo,
  } = state;

  const fetchSubjectPass = (page: number, limit: number) => {
    dispatch({
      type: settingActions.GET_LIST_SUBJECT_PASS,
      payload: {
        page,
        limit,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: settingActions.GET_LIST_SUBJECT_PASS,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchSubjectPass(page + 1, limit);
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
        <Table stickyHeader aria-label="table subject pass">
          <HeaderTableCommon headerList={columns} />
          <TableBody>
            {listSubjectPass?.map(
              (row: IrowTableSubjectPass, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="text-primary">{row?.name}</TableCell>
                    <TableCell>{row?.type}</TableCell>
                    <TableCell>{row?.condition}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={!isPermissionUpdate}
                        onClick={() =>
                          setState({
                            ...state,
                            isShowModalUpdate: true,
                            subjectPassInfo: row,
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
                            subjectPassInfo: row,
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
      <PaginationTableCommon
        total={totalSubjectPass}
        limit={limit}
        page={page}
        setState={setState}
        state={state}
        fetchList={(page: number, limit: number) =>
          fetchSubjectPass(page, limit)
        }
      />
      <ModalSubjectPassPage
        isShowModal={isShowModalAdd}
        type={modalTypes.ADD}
        subjectPassInfo={{}}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
        fetchSubjectPass={() => fetchSubjectPass(page + 1, limit)}
      />
      <ModalSubjectPassPage
        isShowModal={isShowModalUpdate}
        type={modalTypes.UPDATE}
        subjectPassInfo={subjectPassInfo}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        fetchSubjectPass={() => fetchSubjectPass(page + 1, limit)}
      />
      <ModalSubjectPassPage
        isShowModal={isShowModalDelete}
        type={modalTypes.DELETE}
        subjectPassInfo={subjectPassInfo}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        fetchSubjectPass={() => fetchSubjectPass(page + 1, limit)}
      />
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listSubjectPass: state.SettingReducer.listSubjectPass,
    totalSubjectPass: state.SettingReducer.totalSubjectPass,
  };
};

export default connect(mapStateToProps)(SubjectPassTabPage);
