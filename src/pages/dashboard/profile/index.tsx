import React, { useState, SyntheticEvent } from "react";
import { Container } from "rsuite";
import {
  Tab,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { IpropProfile } from "../../../interfaces/dashboard.interface";
import { BsPencilSquare } from "react-icons/bs";

const ProfileDashboardPage = (props: IpropProfile) => {
  const generalTab = "generalInfo";
  const profileTab = "profile";
  const [tabIndex, setTabIndex] = useState(generalTab);
  const { userInfo = {} } = props;
  const { profile = {} } = userInfo;

  const onChangeTab = (e: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <Container className="p-3 fs-6">
      <Box>
        <TabContext value={tabIndex}>
          <Box>
            <TabList
              onChange={onChangeTab}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="lab tabs"
            >
              <Tab value={generalTab} label="General Info" />
              <Tab value={profileTab} label="Profile" />
            </TabList>
          </Box>
          <TabPanel value={generalTab}>
            <Card>
              <CardContent>
                <p>Email: {userInfo?.email}</p>
                <p>Role: {userInfo?.role}</p>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  startIcon={<BsPencilSquare />}
                  size="small"
                >
                  Update Info
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<BsPencilSquare />}
                  size="small"
                >
                  Update password
                </Button>
              </CardActions>
            </Card>
          </TabPanel>
          <TabPanel value={profileTab}>
            <Card>
              <CardContent>
                <p>LastName: {profile?.lastName}</p>
                <p>MiddleName: {profile?.middleName}</p>
                <p>FirstName: {profile?.firstName}</p>
                <p>Code: {profile?.code}</p>
                <p>Gender: {profile?.gender}</p>
                <p>Mobile: {profile?.mobile}</p>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  startIcon={<BsPencilSquare />}
                  size="small"
                >
                  Update profile
                </Button>
              </CardActions>
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    userInfo: state.UserReducer.userInfo,
  };
};

export default connect(mapStateToProps)(ProfileDashboardPage);
