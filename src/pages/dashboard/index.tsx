import React from "react";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";

const DashboardPage = () => {
  return (
    <div className="show-fake-browser sidebar-page mt-1">
      <Container>
        <MenuPage />
      </Container>
    </div>
  );
};

export default DashboardPage;
