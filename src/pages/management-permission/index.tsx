import React from "react";
import ForbidenPage from "../commons/forbiden";
import { validateAccessModule } from "../../utils/permission-handle.util";
import { moduleNames } from "../../constants/constant";
import { Container } from "rsuite";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";

const PermissionMgtPage = () => {
  const isAccess = validateAccessModule(moduleNames.PERMISSION_MANAGEMENT);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <p>Content permission page</p>
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

export default PermissionMgtPage;
