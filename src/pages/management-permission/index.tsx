import React, { useEffect, useState } from "react";
import ForbidenPage from "../commons/forbiden";
import {
  handleDataPermissionTable,
  headerPermisionTable,
  validateAccessModule,
  colors,
} from "../../utils/permission-handle.util";
import { modalTypes, moduleNames } from "../../constants/constant";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import {
  IcolumnPermissionTable,
  IpropPermission,
} from "../../interfaces/permission.interface";
import { userActions } from "../../store/actions";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { Badge, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ModalPermissionMgtPage from "./modals";

const PermissionMgtPage = (props: IpropPermission) => {
  const { listAdmins = [], dispatch } = props;
  const isAccess = validateAccessModule(moduleNames.PERMISSION_MANAGEMENT);
  const columns = headerPermisionTable();
  const rows = handleDataPermissionTable(listAdmins);
  const [isShowModalAdd, setShowModalAdd] = useState(false);
  const [adminInfo, setAdminInfo] = useState({});
  const [isShowModalDelete, setShowModalDelete] = useState(false);

  const fetchAdmins = () => {
    dispatch({
      type: userActions.GET_LIST_ADMIN,
    });
  };

  const onClickAddPermission = (adminInfo = {}) => {
    setShowModalAdd(true);
    setAdminInfo(adminInfo);
  };

  const onClickDeletePermission = (adminInfo = {}) => {
    setShowModalDelete(true);
    setAdminInfo(adminInfo);
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <TableContainer>
                <Table stickyHeader aria-label="Permission table">
                  <TableHead>
                    <TableRow className="fs-6">
                      {columns.map((column: IcolumnPermissionTable) => (
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
                    {rows?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row?._id}
                        >
                          <TableCell>{row?.index}</TableCell>
                          <TableCell>
                            <p className="text-primary">{row?.name}</p>
                          </TableCell>
                          <TableCell>{row?.code}</TableCell>
                          <TableCell>
                            {row?.moduleNames?.map(
                              (item: string, index: number) => {
                                return (
                                  <span key={index}>
                                    <Badge
                                      bg={
                                        colors[
                                          Math.floor(
                                            Math.random() * colors.length
                                          )
                                        ]
                                      }
                                      className="text-black"
                                    >
                                      {item}
                                    </Badge>{" "}
                                  </span>
                                );
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => onClickAddPermission(row)}
                            >
                              <BsPencilSquare />
                            </Button>{" "}
                            <Button variant="outline-danger" size="sm" onClick={() => onClickDeletePermission(row)}>
                              <BsTrash />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <ModalPermissionMgtPage
                type={modalTypes.ADD}
                isShowModal={isShowModalAdd}
                onCloseModal={() => setShowModalAdd(false)}
                adminInfo={adminInfo}
                fetchAdmins={() => fetchAdmins()}
              />
              <ModalPermissionMgtPage
                type={modalTypes.DELETE}
                isShowModal={isShowModalDelete}
                onCloseModal={() => setShowModalDelete(false)}
                adminInfo={adminInfo}
                fetchAdmins={() => fetchAdmins()}
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
    listAdmins: state.UserReducer.listAdmins,
  };
};

export default connect(mapStateToProps)(PermissionMgtPage);
