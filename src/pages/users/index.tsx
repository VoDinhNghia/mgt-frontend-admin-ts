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
  TablePagination,
} from "@mui/material";
import { Button, Card } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import AddAndSearchTable from "../commons/add-search-table";
import ModalUserMgtPage from "./modals";
import { TbDatabaseImport } from "react-icons/tb";
import { AiOutlineFilter } from "react-icons/ai";
import FilterAndImportModal from "./filter-import";
import HeaderTableCommon from "../commons/header-table";

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
    userInfo: {},
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
    userInfo,
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setState({ ...state, page: newPage });
    fetchUsers(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setState({ ...state, limit: newLimit });
    fetchUsers(1, newLimit);
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
              <Card className="mb-2 border-0">
                <Card.Body>
                  <span className="MenuMgtUser">
                    <Button
                      variant="primary"
                      onClick={() =>
                        setState({ ...state, isShowModalImport: true })
                      }
                      disabled={!isPermissionAdd}
                    >
                      <TbDatabaseImport /> Import users
                    </Button>{" "}
                    <Button
                      variant="primary"
                      onClick={() =>
                        setState({ ...state, isShowModalFilter: true })
                      }
                    >
                      <AiOutlineFilter /> Filter
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
                            <Button variant="outline-primary" size="sm">
                              Detail
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                setState({
                                  ...state,
                                  isShowModalUpdate: true,
                                  userInfo: row,
                                })
                              }
                              disabled={!isPermissionUpdate}
                            >
                              <BsPencilSquare />
                            </Button>{" "}
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() =>
                                setState({
                                  ...state,
                                  isShowModalDelete: true,
                                  userInfo: row,
                                })
                              }
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalUser}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
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
            userInfo={userInfo}
          />
          <ModalUserMgtPage
            type={modalTypes.DELETE}
            isShowModal={isShowModalDelete}
            onCloseModal={() =>
              setState({ ...state, isShowModalDelete: false })
            }
            fetchUsers={() => fetchUsers(page + 1, limit)}
            userInfo={userInfo}
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
