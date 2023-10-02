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
import DashboardModalPage from "../modals";
import { modalTypes } from "../../../constants/constant";

const ProfileDashboardPage = (props: IpropProfile) => {
  const generalTab = "generalInfo";
  const profileTab = "profile";
  const [tabIndex, setTabIndex] = useState(generalTab);
  const [isShowModalUpdate, setShowModalUpdate] = useState(false);
  const [isShowModalUpdatePassword, setShowModalUpdatePassword] =
    useState(false);
  const [isShowModalUpdateProfile, setShowModalUpdateProfile] = useState(false);
  const { userInfo = {} } = props;
  const { profile = {} } = userInfo;

  const onChangeTab = (e: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const onCloseModal = () => {
    setShowModalUpdate(false);
    setShowModalUpdatePassword(false);
    setShowModalUpdateProfile(false);
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
                  variant="contained"
                  color="primary"
                  startIcon={<BsPencilSquare />}
                  onClick={() => setShowModalUpdate(true)}
                >
                  Update Info
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BsPencilSquare />}
                  onClick={() => setShowModalUpdatePassword(true)}
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
                  variant="contained"
                  color="primary"
                  startIcon={<BsPencilSquare />}
                  onClick={() => setShowModalUpdateProfile(true)}
                >
                  Update profile
                </Button>
              </CardActions>
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
      <DashboardModalPage
        type={modalTypes.UPDATE}
        isShowModal={isShowModalUpdate}
        onCloseModal={onCloseModal}
        userInfo={userInfo}
      />
      <DashboardModalPage
        type={modalTypes.UPDATE_PASSWORD}
        isShowModal={isShowModalUpdatePassword}
        onCloseModal={onCloseModal}
        userInfo={userInfo}
      />
      <DashboardModalPage
        type={modalTypes.UPDATE_PROFILE}
        isShowModal={isShowModalUpdateProfile}
        onCloseModal={onCloseModal}
        userInfo={userInfo}
      />
    </Container>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    userInfo: state.UserReducer.userInfo,
  };
};

export default connect(mapStateToProps)(ProfileDashboardPage);
