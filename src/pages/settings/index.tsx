import React, { SyntheticEvent, useState } from "react";
import { validateAccessModule } from "../../utils/permission.util";
import { moduleNames } from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SubjectPassTabPage from "./subject-pass-tab";
import LearningRateTabPage from "./learning-rate-tab";
import MoneyCreditTabPage from "./money-credit-tab";
import TitleHeaderPage from "../commons/title-header";

const SettingMgtPage = () => {
  const learningRate = "Learning Rate";
  const subjectPass = "Subject Pass";
  const moneyCredit = "Money Credit";
  const isAccess = validateAccessModule(moduleNames.SETTINGS);
  const [tabIndex, setTabIndex] = useState(learningRate);
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
              <TitleHeaderPage title="Settings management page" />
              <Box>
                <TabContext value={tabIndex}>
                  <Box>
                    <TabList
                      onChange={onChangeTab}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="setting lab"
                    >
                      <Tab value={learningRate} label={learningRate} />
                      <Tab value={subjectPass} label={subjectPass} />
                      <Tab value={moneyCredit} label={moneyCredit} />
                    </TabList>
                  </Box>
                  <TabPanel value={learningRate}>
                    <LearningRateTabPage />
                  </TabPanel>
                  <TabPanel value={subjectPass}>
                    <SubjectPassTabPage />
                  </TabPanel>
                  <TabPanel value={moneyCredit}>
                    <MoneyCreditTabPage />
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

export default SettingMgtPage;
