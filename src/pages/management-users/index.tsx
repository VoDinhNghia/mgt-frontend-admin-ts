import React from "react";
import ForbidenPage from "../commons/forbiden";
import { validateAccessModule } from "../../utils/permission-handle.util";
import { moduleNames } from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import { Container } from "rsuite";

const UserManagementPage = () => {
  const isAccess = validateAccessModule(moduleNames.USER_MANAGEMENT);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <div>User management page</div>
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

export default UserManagementPage;
