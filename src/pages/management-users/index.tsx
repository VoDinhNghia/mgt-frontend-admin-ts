import React, { useEffect, useState } from "react";
import ForbidenPage from "../commons/forbiden";
import { validateAccessModule } from "../../utils/permission-handle.util";
import { moduleNames } from "../../constants/constant";
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
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import AddAndSearchTable from "../commons/add-search-table";

const UserManagementPage = (props: IpropUserMgt) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const isAccess = validateAccessModule(moduleNames.USER_MANAGEMENT);
  const { dispatch, listUsers = [], totalUser = 0 } = props;
  const columns = headersUserTable();
  const rows = handleDataUserTable(listUsers);

  const fetchUsers = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        page: page + 1,
        limit,
      },
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        limit,
        page: newPage + 1,
      },
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        limit: newLimit,
        page: 1,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        searchKey,
      }
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <AddAndSearchTable
                title="Add new user"
                onSearch={(searchKey: string) => onSearch(searchKey)}
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
                          <TableCell className="text-primary">{row.name}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.role}</TableCell>
                          <TableCell>{row.award}</TableCell>
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
