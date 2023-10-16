import React, { SyntheticEvent, useState } from "react";
import { validateAccessModule } from "../../utils/permission.util";
import { moduleNames } from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TitleHeaderPage from "../commons/title-header";
import ClassTabMgtPage from "./class-tab";
import SubjectTabMgtPage from "./subject-tab";

const ClassSubjectMgtPage = () => {
  const classTab = "Class Tab";
  const subjectTab = "Subject Tab";
  const [tabIndex, setTabIndex] = useState(classTab);
  const isAccess = validateAccessModule(moduleNames.CLASS_SUBJECT_MANAGEMENT);
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
              <TitleHeaderPage title="Class subject management page"/>
              <Box>
                <TabContext value={tabIndex}>
                  <Box>
                    <TabList
                      onChange={onChangeTab}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="class tab"
                    >
                      <Tab value={classTab} label={classTab} />
                      <Tab value={subjectTab} label={subjectTab} />
                    </TabList>
                  </Box>
                  <TabPanel value={classTab}>
                    <ClassTabMgtPage />
                  </TabPanel>
                  <TabPanel value={subjectTab}>
                    <SubjectTabMgtPage />
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

export default ClassSubjectMgtPage;
