import React, { useEffect } from "react";
import { validateAccessModule } from "../../utils/permission-handle.util";
import { moduleNames } from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IpropRoomMgt } from "../../interfaces/room.interface";
import { roomActions } from "../../store/actions";

const RoomMgtPage = (props: IpropRoomMgt) => {
  const { dispatch, listRooms = [] } = props;
  const isAccess = validateAccessModule(moduleNames.ROOM_MANAGEMENT);
  const fetchRooms = () => {
    dispatch({
      type: roomActions.GET_LIST_ROOM,
      payload: {
        limit: 10,
        page: 1,
      },
    });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  console.log("listRoom", listRooms);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <p>Room management page</p>
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
