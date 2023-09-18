import React, { useState } from "react";
import { Nav, Sidebar, Sidenav } from "rsuite";
import NavToggleMenuPage from "./nav-toggle";
import LogOutIcon from "@rsuite/icons/legacy/SignOut";
import { logOut } from "../../../services/auth.service";
import { routes } from "../../../constants/constant";
import "./index.css";

const MenuPage = () => {
  const [expand, setExpand] = useState(true);
  const logOutHandle = () => {
    logOut();
    setTimeout(() => {
      window.location.href = routes.login;
    }, 100);
  };

  return (
    <Sidebar
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
      width={expand ? 280 : 70}
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
            <span>{expand ? `test` : null}</span>
          </a>
        </div>
      </Sidenav.Header>
      <Sidenav expanded={expand} appearance="subtle">
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              eventKey="5"
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

export default MenuPage;
