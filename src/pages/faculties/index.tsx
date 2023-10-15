import React, { SyntheticEvent, useState } from "react";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { validateAccessModule } from "../../utils/permission.util";
import { moduleNames } from "../../constants/constant";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FacultyTabPage from "./tab-faculty";
import MajorTabPage from "./tab-major";
import TitleHeaderPage from "../commons/title-header";

const FacultyMgtPage = () => {
  const facultyTab = "Faculty";
  const majorTab = "Major";
  const [tabIndex, setTabIndex] = useState(facultyTab);
  const isAccess = validateAccessModule(moduleNames.FACULTIES_MANAGEMENT);

  const onChangeTab = (e: SyntheticEvent, newTab: string) => {
    setTabIndex(newTab);
  };

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <TitleHeaderPage title="Faculty management page"/>
              <Box>
                <TabContext value={tabIndex}>
                  <Box>
                    <TabList
                      onChange={onChangeTab}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="faculties lab"
                    >
                      <Tab value={facultyTab} label={facultyTab} />
                      <Tab value={majorTab} label={majorTab} />
                    </TabList>
                  </Box>
                  <TabPanel value={facultyTab}>
                    <FacultyTabPage />
                  </TabPanel>
                  <TabPanel value={majorTab}>
                    <MajorTabPage />
                  </TabPanel>
                </TabContext>
              </Box>
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

export default FacultyMgtPage;
