import React, { useEffect } from "react";
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
} from "@mui/material";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const UserManagementPage = (props: IpropUserMgt) => {
  const isAccess = validateAccessModule(moduleNames.USER_MANAGEMENT);
  const { dispatch, listUsers = [] } = props;
  const columns = headersUserTable();
  const rows = handleDataUserTable(listUsers);

  const fetchUsers = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        page: 1,
        limit: 10,
      },
    });
  };

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
              <TableContainer>
                <Table stickyHeader aria-label="user table">
                  <TableHead>
                    <TableRow>
                      {columns?.map((column: IcolumnUserTable) => (
                        <TableCell key={column.id}>{column.label}</TableCell>
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
                          <TableCell>{row.name}</TableCell>
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
