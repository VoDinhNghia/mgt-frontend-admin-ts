import React, { useEffect, useState } from "react";
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
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { connect } from "react-redux";
import {
  IstateRedux,
  IallStateReadMore,
} from "../../interfaces/common.interface";
import {
  IpropRoomMgt,
  IroomInfoReadMore,
  IrowTableRoom,
} from "../../interfaces/room.interface";
import { roomActions } from "../../store/actions";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { headerRoomTable } from "../../utils/room.util";
import { Button } from "react-bootstrap";
import ModalRomMgtPage from "./modals";
import ReadMoreCommon from "../commons/readmore";
import AddAndSearchTable from "../commons/add-search-table";
import HeaderTableCommon from "../commons/header-table";
import PaginationTableCommon from "../commons/pagination-table";
import ActionTableCommon from "../commons/actions-table";
import TitleHeaderPage from "../commons/title-header";

const RoomMgtPage = (props: IpropRoomMgt) => {
  const { dispatch, listRooms = [], totalRoom = 0 } = props;
  const [state, setState] = useState({
    isShowModalDivice: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    isShowModalAdd: false,
    page: 0,
    limit: 5,
    rowData: {},
    readMore: {},
  });
  const isAccess = validateAccessModule(moduleNames.ROOM_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.ROOM_MANAGEMENT
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.ROOM_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.ROOM_MANAGEMENT
  );
  const columns = headerRoomTable();
  const {
    isShowModalAdd,
    isShowModalDelete,
    isShowModalDivice,
    isShowModalUpdate,
    page,
    limit,
    rowData,
    readMore,
  } = state;
  const allStateReadMore: IallStateReadMore = readMore;
  const roomInfoReadmore: IroomInfoReadMore = rowData;

  const fetchRooms = (page: number, limit: number) => {
    dispatch({
      type: roomActions.GET_LIST_ROOM,
      payload: {
        limit,
        page,
      },
    });
  };

  const handleReadMore = (roomInfo: IroomInfoReadMore) => {
    const isReadMore = allStateReadMore[`${roomInfo?._id}`];
    setState({
      ...state,
      readMore: { [`${roomInfo?._id}`]: !isReadMore },
      rowData: roomInfo,
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: roomActions.GET_LIST_ROOM,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchRooms(page + 1, limit);
  }, []);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <TitleHeaderPage title="Rooms management page"/>
              <AddAndSearchTable
                isDisableBtnAdd={!isPermissionAdd}
                title="Add new room"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              <TableContainer>
                <Table stickyHeader aria-label="room table">
                  <HeaderTableCommon headerList={columns} />
                  <TableBody>
                    {listRooms?.map((room: IrowTableRoom, index: number) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={room?._id}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <p className="text-primary">{room?.name}</p>
                          </TableCell>
                          <TableCell>{room?.type}</TableCell>
                          <TableCell>{room?.capacity}</TableCell>
                          <TableCell>
                            <ReadMoreCommon
                              isReadMore={
                                room._id === roomInfoReadmore?._id
                                  ? allStateReadMore[`${room._id}`]
                                  : false
                              }
                              setReadMore={() => handleReadMore(room)}
                              lengthSlice={20}
                            >
                              {room?.description}
                            </ReadMoreCommon>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                setState({
                                  ...state,
                                  isShowModalDivice: true,
                                  rowData: room,
                                })
                              }
                            >
                              Detail
                            </Button>
                          </TableCell>
                          <TableCell>
                            <ActionTableCommon
                              state={state}
                              setState={setState}
                              rowData={room}
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
                total={totalRoom}
                limit={limit}
                page={page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchRooms(page, limit)
                }
              />
              <ModalRomMgtPage
                type={modalTypes.VIEW}
                isShowModal={isShowModalDivice}
                roomInfo={rowData}
                size="sm"
                fetchRooms={() => fetchRooms(page + 1, limit)}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDivice: false })
                }
              />
              <ModalRomMgtPage
                type={modalTypes.UPDATE}
                isShowModal={isShowModalUpdate}
                roomInfo={rowData}
                size="xs"
                fetchRooms={() => fetchRooms(page + 1, limit)}
                onCloseModal={() =>
                  setState({ ...state, isShowModalUpdate: false })
                }
              />
              <ModalRomMgtPage
                type={modalTypes.DELETE}
                isShowModal={isShowModalDelete}
                roomInfo={rowData}
                size="xs"
                fetchRooms={() => fetchRooms(page + 1, limit)}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDelete: false })
                }
              />
              <ModalRomMgtPage
                type={modalTypes.ADD}
                isShowModal={isShowModalAdd}
                roomInfo={{}}
                size="xs"
                fetchRooms={() => fetchRooms(page + 1, limit)}
                onCloseModal={() =>
                  setState({ ...state, isShowModalAdd: false })
                }
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

const mapStateToProp = (state: IstateRedux) => {
  return {
    listRooms: state.RoomReducer.listRooms,
    totalRoom: state.RoomReducer.totalRoom,
  };
};

export default connect(mapStateToProp)(RoomMgtPage);
