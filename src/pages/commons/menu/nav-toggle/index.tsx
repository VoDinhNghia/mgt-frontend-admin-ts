import React from "react";
import { Navbar, Nav } from "rsuite";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import { IpropsNavToggle } from "../../../../interfaces/common.interface";

const NavToggleMenuPage = (props: IpropsNavToggle) => {
  const { expand, setExpand } = props;
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav pullRight>
        <Nav.Item
          onClick={() => setExpand()}
          style={{
            width: 56,
            textAlign: "center",
            fontSize: "30px",
            color: "white",
          }}
        >
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavToggleMenuPage;
