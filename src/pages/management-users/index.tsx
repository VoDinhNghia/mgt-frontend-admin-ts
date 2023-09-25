import React, { useEffect, useState } from "react";
import "./index.css";
import ForbidenPage from "../commons/forbiden";
import {
  validateAccessModule,
  validateAction,
} from "../../utils/permission-handle.util";
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
import {
  IcolumnUserTable,
  IpropUserMgt,
  IrowUserTable,
} from "../../interfaces/user.interface";
import { userActions } from "../../store/actions";
import {
  handleDataUserTable,
  headersUserTable,
} from "../../utils/user-handle.util";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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

const UserManagementPage = (props: IpropUserMgt) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [isShowModalAdd, setShowModalAdd] = useState(false);
  const [isShowModalUpdate, setShowModalUpdate] = useState(false);
  const [isShowModalDelete, setShowModalDelete] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isShowModalImport, setShowModalImport] = useState(false);
  const [isShowModalFilter, setShowModalFilter] = useState(false);
  const isAccess = validateAccessModule(moduleNames.USER_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.USER_MANAGEMENT
  );
  const { dispatch, listUsers = [], totalUser = 0 } = props;
  const columns = headersUserTable();
  const rows = handleDataUserTable(listUsers);

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
    setPage(newPage);
    fetchUsers(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    fetchUsers(1, newLimit);
  };

  const onShowUpdate = (user: IrowUserTable) => {
    setShowModalUpdate(true);
    setUserInfo(user);
  }

  const onShowDelete = (user: IrowUserTable) => {
    setShowModalDelete(true);
    setUserInfo(user);
  }

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
                      variant="outline-primary"
                      onClick={() => setShowModalImport(true)}
                      disabled={!isPermissionAdd}
                    >
                      <TbDatabaseImport /> Import users
                    </Button>{" "}
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowModalFilter(true)}
                    >
                      <AiOutlineFilter /> Filter
                    </Button>
                  </span>
                </Card.Body>
              </Card>
              <AddAndSearchTable
                title="Add new user"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setShowModalAdd(true)}
                isDisableBtnAdd={!isPermissionAdd}
              />
              <TableContainer>
                <Table stickyHeader aria-label="user table">
                  <TableHead>
                    <TableRow className="fs-6">
                      {columns?.map((column: IcolumnUserTable) => (
                        <TableCell
                          key={column.id}
                          className="bg-success text-white"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
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
                          <TableCell><Button variant="outline-primary" size="sm">Detail</Button></TableCell>
                          <TableCell>
                            <Button variant="outline-primary" size="sm" onClick={() => onShowUpdate(row)}>
                              <BsPencilSquare />
                            </Button>{" "}
                            <Button variant="outline-danger" size="sm" onClick={() => onShowDelete(row)}>
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
            onCloseModal={() => setShowModalAdd(false)}
            fetchUsers={() => fetchUsers(page + 1, limit)}
          />
          <ModalUserMgtPage
            type={modalTypes.UPDATE}
            isShowModal={isShowModalUpdate}
            onCloseModal={() => setShowModalUpdate(false)}
            fetchUsers={() => fetchUsers(page + 1, limit)}
            userInfo={userInfo}
          />
          <ModalUserMgtPage
            type={modalTypes.DELETE}
            isShowModal={isShowModalDelete}
            onCloseModal={() => setShowModalDelete(false)}
            fetchUsers={() => fetchUsers(page + 1, limit)}
            userInfo={userInfo}
          />
          <FilterAndImportModal
            type={modalTypes.IMPORT}
            isShowModal={isShowModalImport}
            onCloseModal={() => setShowModalImport(false)}
            fetchUsers={() => fetchUsers(page + 1, limit)}
          />
          <FilterAndImportModal
            type={modalTypes.FILTER}
            isShowModal={isShowModalFilter}
            onCloseModal={() => setShowModalFilter(false)}
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
