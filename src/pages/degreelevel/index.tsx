import React, { useEffect, useState } from "react";
import {
  validateAccessModule,
  validateAction,
} from "../../utils/permission.util";
import { moduleNames, permissonTypes } from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import TitleHeaderPage from "../commons/title-header";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import {
  Idegreelevel,
  IpropsDegreelevelPage,
} from "../../interfaces/degreelevel.interface";
import { degreelevelActions } from "../../store/actions";
import AddAndSearchTable from "../commons/add-search-table";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import HeaderTableCommon from "../commons/header-table";
import PaginationTableCommon from "../commons/pagination-table";
import { headerTableDegreelevel } from "../../utils/degreelevel.util";
import ActionTableCommon from "../commons/actions-table";

const DegreelevelMgtPage = (props: IpropsDegreelevelPage) => {
  const { dispatch, listDegreelevels = [], totalDegreelevel = 0 } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 5,
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    rowData: {},
  });

  const isAccess = validateAccessModule(moduleNames.DEGREELEVELS_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.DEGREELEVELS_MANAGEMENT
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.DEGREELEVELS_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.DEGREELEVELS_MANAGEMENT
  );
  const { limit, page } = state;

  const fetchDegreelevels = (page: number, limit: number) => {
    dispatch({
      type: degreelevelActions.GET_LIST_DEGREELEVEL,
      payload: {
        limit,
        page,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: degreelevelActions.GET_LIST_DEGREELEVEL,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchDegreelevels(page + 1, limit);
  }, []);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <TitleHeaderPage title="DegreeLevel management page" />
              <AddAndSearchTable
                isDisableBtnAdd={!isPermissionAdd}
                title="Add Degreelevel"
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
                onSearch={(value: string) => onSearch(value)}
              />
              <TableContainer>
                <Table stickyHeader aria-label="degreelevel table">
                  <HeaderTableCommon headerList={headerTableDegreelevel} />
                  <TableBody>
                    {listDegreelevels?.map(
                      (degreelevel: Idegreelevel, index: number) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={degreelevel?._id}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="text-primary">
                              {degreelevel?.name}
                            </TableCell>
                            <TableCell>{degreelevel?.description}</TableCell>
                            <TableCell>
                              <ActionTableCommon
                                isPermissionDelete={isPermissionDelete}
                                isPermissionUpdate={isPermissionUpdate}
                                state={state}
                                setState={setState}
                                rowData={degreelevel}
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
                page={page}
                limit={limit}
                state={state}
                setState={setState}
                total={totalDegreelevel}
                fetchList={() => fetchDegreelevels(page, limit)}
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
    listDegreelevels: state.DegreelevelReducer.listDegreelevels,
    totalDegreelevel: state.DegreelevelReducer.totalDegreelevel,
  };
};

export default connect(mapStateToProps)(DegreelevelMgtPage);
