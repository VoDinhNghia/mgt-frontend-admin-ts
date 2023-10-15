import React, { useEffect, useState } from "react";
import ForbidenPage from "../commons/forbiden";
import {
  handleDataPermissionTable,
  headerPermisionTable,
  validateAccessModule,
  colors,
  validateAction,
} from "../../utils/permission.util";
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../constants/constant";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IpropPermission } from "../../interfaces/permission.interface";
import { userActions } from "../../store/actions";
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { Badge } from "react-bootstrap";
import ModalPermissionMgtPage from "./modals";
import HeaderTableCommon from "../commons/header-table";
import ActionTableCommon from "../commons/actions-table";
import TitleHeaderPage from "../commons/title-header";

const PermissionMgtPage = (props: IpropPermission) => {
  const { listAdmins = [], dispatch } = props;
  const isAccess = validateAccessModule(moduleNames.PERMISSION_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.PERMISSION_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.PERMISSION_MANAGEMENT
  );
  const columns = headerPermisionTable();
  const rows = handleDataPermissionTable(listAdmins);
  const [state, setState] = useState({
    isShowModalUpdate: false,
    isShowModalDelete: false,
    rowData: {},
  });

  const fetchAdmins = () => {
    dispatch({
      type: userActions.GET_LIST_ADMIN,
    });
  };

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
              <TitleHeaderPage title="Permission management page"/>
              <TableContainer>
                <Table stickyHeader aria-label="Permission table">
                  <HeaderTableCommon headerList={columns} />
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
                            <ActionTableCommon
                              state={state}
                              setState={setState}
                              rowData={row}
                              isPermissionDelete={isPermissionDelete}
                              isPermissionUpdate={isPermissionAdd}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <ModalPermissionMgtPage
                type={modalTypes.ADD}
                isShowModal={state.isShowModalUpdate}
                onCloseModal={() =>
                  setState({ ...state, isShowModalUpdate: false })
                }
                adminInfo={state.rowData}
                fetchAdmins={() => fetchAdmins()}
              />
              <ModalPermissionMgtPage
                type={modalTypes.DELETE}
                isShowModal={state.isShowModalDelete}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDelete: false })
                }
                adminInfo={state.rowData}
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
