/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useState } from "react";
import { IpropModal } from "../../../interfaces/dashboard.interface";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { modalTypes } from "../../../constants/constant";
import { connect } from "react-redux";
import { userActions } from "../../../store/actions";
import { IeventOnchangeInput } from "../../../interfaces/common.interface";

const DashboardModalPage = (props: IpropModal) => {
  const { type, isShowModal, onCloseModal, userInfo = {}, dispatch } = props;
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [enterPassword, setEnterPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");

  const updateInfo = () => {
    dispatch({
      type: userActions.UPDATE_USER_INFO,
      id: userInfo?._id,
      payload: {
        email: email || userInfo?.email,
      },
    });
    fetchInfoAndCloseModal();
  };

  const updatePassword = () => {
    if (!currentPassword || !newPassword || !enterPassword) {
      NotificationManager.error(
        "current password, new password and enter password must is provided!",
        "Update password",
        4000
      );
    } else if (newPassword !== enterPassword) {
      NotificationManager.error(
        "new password doesn't match with enter password",
        "Update password",
        4000
      );
    } else {
      dispatch({
        type: userActions.UPDATE_USER_INFO,
        id: userInfo?._id,
        payload: {
          password: currentPassword,
          newPassword,
        },
      });
      fetchInfoAndCloseModal();
    }
  };

  const updateProfile = () => {
    const { profile = {} } = userInfo;
    dispatch({
      type: userActions.UPDATE_USER_PROFILE,
      id: profile?._id,
      payload: {
        firstName: firstName || profile?.firstName,
        lastName: lastName || profile?.lastName,
        middleName,
        mobile: mobile || profile?.mobile,
        gender: gender || profile?.gender,
      },
    });
    fetchInfoAndCloseModal();
  };

  const fetchInfoAndCloseModal = () => {
    setTimeout(() => {
      dispatch({
        type: userActions.GET_ME,
      });
      onCloseModal();
    }, 70);
  };

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle>
        {type === modalTypes.UPDATE ? "Update general user info" : null}
        {type === modalTypes.UPDATE_PASSWORD ? "Update password" : null}
        {type === modalTypes.UPDATE_PROFILE ? "Update profile user" : null}
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.UPDATE ? (
          <>
            <p className="mb-1">Email: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.email}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) => setEmail(e.target.value)}
            />
          </>
        ) : null}
        {type === modalTypes.UPDATE_PASSWORD ? (
          <>
            <p className="mb-1">Current password: </p>
            <TextField
              size="small"
              type="password"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) =>
                setCurrentPassword(e.target.value)
              }
            />
            <p className="mt-2 mb-1">New password: </p>
            <TextField
              size="small"
              type="password"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) =>
                setNewPassword(e.target.value)
              }
            />
            <p className="mt-2 mb-1">Enter new password: </p>
            <TextField
              size="small"
              type="password"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) =>
                setEnterPassword(e.target.value)
              }
            />
          </>
        ) : null}
        {type === modalTypes.UPDATE_PROFILE ? (
          <>
            <p className="mb-1">LastName: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.lastName}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) => setLastName(e.target.value)}
            />
            <p className="mt-2 mb-1">MiddleName: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.middleName}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setMiddleName(e.target.value)
              }
            />
            <p className="mt-2 mb-1">FirstName: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.firstName}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setFirstName(e.target.value)
              }
            />
            <p className="mt-2 mb-1">Gender: </p>
            <Select
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.gender}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) => setGender(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <p className="mt-2 mb-1">Mobile: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.mobile}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) => setMobile(e.target.value)}
            />
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        {type === modalTypes.UPDATE ? (
          <Button variant="outlined" onClick={() => updateInfo()}>
            Save Info
          </Button>
        ) : null}
        {type === modalTypes.UPDATE_PASSWORD ? (
          <Button variant="outlined" onClick={() => updatePassword()}>
            Change Password
          </Button>
        ) : null}
        {type === modalTypes.UPDATE_PROFILE ? (
          <Button variant="outlined" onClick={() => updateProfile()}>
            Save Profile
          </Button>
        ) : null}
        <Button variant="outlined" color="error" onClick={() => onCloseModal()}>
          Cancle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect()(DashboardModalPage);
