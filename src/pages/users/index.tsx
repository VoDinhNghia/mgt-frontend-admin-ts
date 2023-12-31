import React, { useEffect, useState } from "react";
import "./index.css";
import ForbidenPage from "../commons/forbiden";
import {
  validateAccessModule,
  validateAction,
} from "../../utils/permission.util";
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { Container } from "rsuite";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IpropUserMgt, IrowUserTable } from "../../interfaces/user.interface";
import { userActions } from "../../store/actions";
import { handleDataUserTable, headersUserTable } from "../../utils/user.util";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
} from "@mui/material";
import { Card } from "react-bootstrap";
import AddAndSearchTable from "../commons/add-search-table";
import ModalUserMgtPage from "./modals";
import { TbDatabaseImport } from "react-icons/tb";
import { AiOutlineFilter } from "react-icons/ai";
import FilterAndImportModal from "./filter-import";
import HeaderTableCommon from "../commons/header-table";
import PaginationTableCommon from "../commons/pagination-table";
import ActionTableCommon from "../commons/actions-table";
import { FcViewDetails } from "react-icons/fc";
import TitleHeaderPage from "../commons/title-header";

const UserManagementPage = (props: IpropUserMgt) => {
  const { dispatch, listUsers = [], totalUser = 0 } = props;
  const [state, setState] = useState({
    limit: 5,
    page: 0,
    isShowModalAdd: false,
    isShowModalDelete: false,
    isShowModalFilter: false,
    isShowModalImport: false,
    isShowModalUpdate: false,
    rowData: {},
  });
  const isAccess = validateAccessModule(moduleNames.USER_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.USER_MANAGEMENT
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.USER_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.USER_MANAGEMENT
  );
  const columns = headersUserTable();
  const rows = handleDataUserTable(listUsers);
  const {
    page,
    limit,
    isShowModalAdd,
    isShowModalDelete,
    isShowModalFilter,
    isShowModalImport,
    isShowModalUpdate,
    rowData,
  } = state;

  const fetchUsers = (page: number, limit: number) => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        page,
        limit,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchUsers(page + 1, limit);
  }, []);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <TitleHeaderPage title="User management page"/>
              <Card className="mb-2 border-0">
                <Card.Body>
                  <span className="MenuMgtUser">
                    <Button
                      variant="contained"
                      onClick={() =>
                        setState({ ...state, isShowModalImport: true })
                      }
                      disabled={!isPermissionAdd}
                      startIcon={<TbDatabaseImport />}
                    >
                      Import users
                    </Button>{" "}
                    <Button
                      variant="contained"
                      onClick={() =>
                        setState({ ...state, isShowModalFilter: true })
                      }
                      startIcon={<AiOutlineFilter />}
                    >
                      Filter
                    </Button>
                  </span>
                </Card.Body>
              </Card>
              <AddAndSearchTable
                title="Add new user"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
                isDisableBtnAdd={!isPermissionAdd}
              />
              <TableContainer>
                <Table stickyHeader aria-label="user table">
                  <HeaderTableCommon headerList={columns} />
                  <TableBody>
                    {rows?.map((row: IrowUserTable) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row?.code}
                        >
                          <TableCell>{row.index}</TableCell>
                          <TableCell className="text-primary">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.role}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              className="border-0"
                              size="small"
                              startIcon={<FcViewDetails />}
                            >
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <ActionTableCommon
                              setState={setState}
                              state={state}
                              rowData={row}
                              isPermissionDelete={isPermissionDelete}
                              isPermissionUpdate={isPermissionUpdate}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <PaginationTableCommon
                total={totalUser}
                limit={limit}
                page={page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchUsers(page, limit)
                }
              />
            </Container>
          </Container>
          <FooterPage />
          <ModalUserMgtPage
            type={modalTypes.ADD}
            isShowModal={isShowModalAdd}
            onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
            fetchUsers={() => fetchUsers(page + 1, limit)}
          />
          <ModalUserMgtPage
            type={modalTypes.UPDATE}
            isShowModal={isShowModalUpdate}
            onCloseModal={() =>
              setState({ ...state, isShowModalUpdate: false })
            }
            fetchUsers={() => fetchUsers(page + 1, limit)}
            userInfo={rowData}
          />
          <ModalUserMgtPage
            type={modalTypes.DELETE}
            isShowModal={isShowModalDelete}
            onCloseModal={() =>
              setState({ ...state, isShowModalDelete: false })
            }
            fetchUsers={() => fetchUsers(page + 1, limit)}
            userInfo={rowData}
          />
          <FilterAndImportModal
            type={modalTypes.IMPORT}
            isShowModal={isShowModalImport}
            onCloseModal={() =>
              setState({ ...state, isShowModalImport: false })
            }
            fetchUsers={() => fetchUsers(page + 1, limit)}
          />
          <FilterAndImportModal
            type={modalTypes.FILTER}
            isShowModal={isShowModalFilter}
            onCloseModal={() =>
              setState({ ...state, isShowModalFilter: false })
            }
            fetchUsers={() => fetchUsers(page + 1, limit)}
          />
        </div>
      ) : (
        <ForbidenPage />
      )}
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listUsers: state.UserReducer.listUsers,
    totalUser: state.UserReducer.totalUser,
  };
};

export default connect(mapStateToProps)(UserManagementPage);
