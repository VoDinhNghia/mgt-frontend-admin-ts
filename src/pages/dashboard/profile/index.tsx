import React, { useState } from "react";
import "./index.css";
import { Container } from "rsuite";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from "@mui/material";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { IpropProfile } from "../../../interfaces/dashboard.interface";
import { BsPencilSquare } from "react-icons/bs";
import DashboardModalPage from "../modals";
import { modalTypes } from "../../../constants/constant";
import TitleHeaderPage from "../../commons/title-header";

const ProfileDashboardPage = (props: IpropProfile) => {
  const [state, setState] = useState({
    isShowModalUpdate: false,
    isShowModalUpdatePassword: false,
    isShowModalUpdateProfile: false,
  });
  const {
    isShowModalUpdate,
    isShowModalUpdatePassword,
    isShowModalUpdateProfile,
  } = state;
  const { userInfo = {} } = props;
  const { profile = {} } = userInfo;

  return (
    <Container className="p-3 fs-6">
      <TitleHeaderPage title="User infomation management" />
      <Card variant="outlined" className="border border-primary">
        <CardHeader title="General Info" />
        <CardContent>
          <p>Email: {userInfo?.email}</p>
          <p>Role: {userInfo?.role}</p>
        </CardContent>
        <CardActions className="ProfileActions">
          <Button
            variant="outlined"
            color="success"
            startIcon={<BsPencilSquare />}
            onClick={() => setState({ ...state, isShowModalUpdate: true })}
            size="small"
          >
            Update Info
          </Button>
          <Button
            variant="outlined"
            color="success"
            startIcon={<BsPencilSquare />}
            onClick={() =>
              setState({ ...state, isShowModalUpdatePassword: true })
            }
            size="small"
          >
            Update password
          </Button>
        </CardActions>
      </Card>
      <Card variant="outlined" className="border border-primary mt-2">
        <CardHeader title="Profile" className="bg-success text-white" />
        <CardContent>
          <p>LastName: {profile?.lastName}</p>
          <p>MiddleName: {profile?.middleName}</p>
          <p>FirstName: {profile?.firstName}</p>
          <p>Code: {profile?.code}</p>
          <p>Gender: {profile?.gender}</p>
          <p>Mobile: {profile?.mobile}</p>
        </CardContent>
        <CardActions className="ProfileActions">
          <Button
            variant="outlined"
            color="success"
            startIcon={<BsPencilSquare />}
            onClick={() =>
              setState({ ...state, isShowModalUpdateProfile: true })
            }
            size="small"
          >
            Update profile
          </Button>
        </CardActions>
      </Card>
      <DashboardModalPage
        type={modalTypes.UPDATE}
        isShowModal={isShowModalUpdate}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        userInfo={userInfo}
      />
      <DashboardModalPage
        type={modalTypes.UPDATE_PASSWORD}
        isShowModal={isShowModalUpdatePassword}
        onCloseModal={() =>
          setState({ ...state, isShowModalUpdatePassword: false })
        }
        userInfo={userInfo}
      />
      <DashboardModalPage
        type={modalTypes.UPDATE_PROFILE}
        isShowModal={isShowModalUpdateProfile}
        onCloseModal={() =>
          setState({ ...state, isShowModalUpdateProfile: false })
        }
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
