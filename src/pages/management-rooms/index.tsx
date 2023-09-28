import React, { useEffect, useState } from "react";
import { validateAccessModule, validateAction } from "../../utils/permission-handle.util";
import { modalTypes, moduleNames, permissonTypes } from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IallStateReadMore, IpropRoomMgt, IroomInfoReadMore, IrowTableRoom } from "../../interfaces/room.interface";
import { roomActions } from "../../store/actions";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { headerRoomTable } from "../../utils/room.util";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ModalRomMgtPage from "./modals";
import ReadMoreCommon from "../commons/readmore";
import AddAndSearchTable from "../commons/add-search-table";

const RoomMgtPage = (props: IpropRoomMgt) => {
  const { dispatch, listRooms = [], totalRoom = 0 } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [roomInfo, setRoomInfo] = useState({});
  const [readMore, setReadMore] = useState({});
  const [isShowModalDivice, setShowModalDivice] = useState(false);
  const [isShowModalUpdate, setShowModalUpdate] = useState(false);
  const [isShowModalDelete, setShowModalDelete] = useState(false);
  const [isShowModalAdd, setShowModalAdd] = useState(false);
  const isAccess = validateAccessModule(moduleNames.ROOM_MANAGEMENT);
  const isPermissionAdd = validateAction(permissonTypes.ADD, moduleNames.ROOM_MANAGEMENT);
  const isPermissionUpdate = validateAction(permissonTypes.EDIT, moduleNames.ROOM_MANAGEMENT);
  const isPermissionDelete = validateAction(permissonTypes.DELETE, moduleNames.ROOM_MANAGEMENT);
  const columns = headerRoomTable();
  const allStateReadMore: IallStateReadMore = readMore;
  const roomInfoReadmore: IroomInfoReadMore = roomInfo;
  
  const fetchRooms = (page: number, limit: number) => {
    dispatch({
      type: roomActions.GET_LIST_ROOM,
      payload: {
        limit,
        page,
      },
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchRooms(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    fetchRooms(1, newLimit);
  };

  const handleModalDivice = (roomInfo = {}) => {
    setShowModalDivice(true);
    setRoomInfo(roomInfo);
  };

  const handleModalUpdate = (roomInfo = {}) => {
    setShowModalUpdate(true);
    setRoomInfo(roomInfo);
  };

  const handleModalDelete = (roomInfo = {}) => {
    setShowModalDelete(true);
    setRoomInfo(roomInfo);
  };

  const handleReadMore = (roomInfo: IroomInfoReadMore) => {
    const isReadMore = allStateReadMore[`${roomInfo?._id}`];
    setReadMore({
      ...readMore,
      [`${roomInfo?._id}`]: !isReadMore,
    });
    setRoomInfo(roomInfo);
  }

  const onSearch = (searchKey: string) => {
    dispatch({
      type: roomActions.GET_LIST_ROOM,
      payload: {
        searchKey,
      }
    });
  }

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
              <AddAndSearchTable
                isDisableBtnAdd={!isPermissionAdd}
                title="Add new room"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setShowModalAdd(true)}
              />
              <TableContainer>
                <Table stickyHeader aria-label="room table">
                  <TableHead>
                    <TableRow className="fs-6">
                      {columns.map((column, index) => (
                        <TableCell
                          key={`${index}-${column.id}`}
                          className="bg-primary text-white"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
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
                              isReadMore={room._id === roomInfoReadmore?._id ? allStateReadMore[`${room._id}`] : false}
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
                              onClick={() => handleModalDivice(room)}
                            >
                              Detail
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline-primary" size="sm" onClick={() => handleModalUpdate(room)} disabled={!isPermissionUpdate}>
                              <BsPencilSquare />
                            </Button>{" "}
                            <Button variant="outline-danger" size="sm" onClick={() => handleModalDelete(room)} disabled={!isPermissionDelete}>
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
                count={totalRoom}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <ModalRomMgtPage
                type={modalTypes.VIEW}
                isShowModal={isShowModalDivice}
                roomInfo={roomInfo}
                size="sm"
                fetchRooms={() => fetchRooms(page + 1, limit)}
                onCloseModal={() => setShowModalDivice(false)}
              />
              <ModalRomMgtPage
                type={modalTypes.UPDATE}
                isShowModal={isShowModalUpdate}
                roomInfo={roomInfo}
                size="xs"
                fetchRooms={() => fetchRooms(page + 1, limit)}
                onCloseModal={() => setShowModalUpdate(false)}
              />
              <ModalRomMgtPage
                type={modalTypes.DELETE}
                isShowModal={isShowModalDelete}
                roomInfo={roomInfo}
                size="xs"
                fetchRooms={() => fetchRooms(page + 1, limit)}
                onCloseModal={() => setShowModalDelete(false)}
              />
              <ModalRomMgtPage
                type={modalTypes.ADD}
                isShowModal={isShowModalAdd}
                roomInfo={roomInfo}
                size="xs"
                fetchRooms={() => fetchRooms(page + 1, limit)}
                onCloseModal={() => setShowModalAdd(false)}
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
