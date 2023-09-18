import React, { useState, useEffect } from "react";
import { Nav, Sidebar, Sidenav } from "rsuite";
import NavToggleMenuPage from "./nav-toggle";
import LogOutIcon from "@rsuite/icons/legacy/SignOut";
import { logOut } from "../../../services/auth.service";
import { moduleNames, routes } from "../../../constants/constant";
import "./index.css";
import {
  IstateRedux,
  IuserReducer,
} from "../../../interfaces/common.interface";
import { connect } from "react-redux";
import { userActions } from "../../../store/actions";
import UserMgtIcon from "@rsuite/icons/legacy/Group";
import { validateAccessModule } from "../../../utils/permission-handle.util";

const MenuPage = (props: IuserReducer) => {
  const { userInfo = {} } = props;
  const [expand, setExpand] = useState(true);

  const userName = `${userInfo?.profile?.lastName} ${userInfo?.profile?.middleName} ${userInfo?.profile?.firstName}`;
  const isAccessModuleUser = validateAccessModule(moduleNames.USER_MANAGEMENT);

  const fetchUserInfo = () => {
    const { dispatch } = props;
    dispatch({
      type: userActions.GET_ME,
    });
  };

  const logOutHandle = () => {
    logOut();
    setTimeout(() => {
      window.location.href = routes.login;
    }, 100);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Sidebar
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
      width={expand ? 320 : 70}
      collapsible
    >
      <Sidenav.Header>
        <div
          style={{
            padding: 18,
            fontSize: 16,
            height: 56,
            background: "blue",
            color: "#fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <a href={routes.dashboard} className="text-white">
            <img src="/images/userIcon.png" alt="" className="UserAvatar" />
            <span>
              {expand ? `${userName} - ${userInfo?.profile?.code}` : null}
            </span>
          </a>
        </div>
      </Sidenav.Header>
      <Sidenav expanded={expand} appearance="subtle">
        <Sidenav.Body>
          <Nav>
            {isAccessModuleUser ? (
              <Nav.Item
                eventKey="1"
                icon={<UserMgtIcon />}
                className="ItemMenuPage"
              >
                {moduleNames.USER_MANAGEMENT}
              </Nav.Item>
            ) : null}
            <Nav.Item
              eventKey="2"
              icon={<LogOutIcon />}
              className="ItemMenuPage"
              onClick={() => logOutHandle()}
            >
              LogOut
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggleMenuPage expand={expand} setExpand={() => setExpand(!expand)} />
    </Sidebar>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    userInfo: state.UserReducer.userInfo,
  };
};

export default connect(mapStateToProps)(MenuPage);
