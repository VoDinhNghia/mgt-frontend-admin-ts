import React from "react";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import ProfileDashboardPage from "./profile";
import FooterPage from "../commons/footer";

const DashboardPage = () => {
  return (
    <div className="show-fake-browser sidebar-page mt-1">
      <Container>
        <MenuPage />
        <ProfileDashboardPage />
      </Container>
      <FooterPage />
    </div>
  );
};

export default DashboardPage;
