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

  const updateInfo = () => {
    dispatch({
      type: userActions.UPDATE_USER_INFO,
      id: userInfo?._id,
      payload: {
        email: email || userInfo?.email,
      }
    });
    fetchInfoAndCloseModal();
  }

  const fetchInfoAndCloseModal = () => {
    setTimeout(() => {
      dispatch({
        type: userActions.GET_ME,
      });
      onCloseModal();
    }, 70);
  }

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
            />
            <p className="mt-2 mb-1">New password: </p>
            <TextField
              size="small"
              type="password"
              fullWidth={true}
              variant="outlined"
            />
            <p className="mt-2 mb-1">Enter new password: </p>
            <TextField
              size="small"
              type="password"
              fullWidth={true}
              variant="outlined"
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
            />
            <p className="mt-2 mb-1">MiddleName: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.middleName}
              fullWidth={true}
            />
            <p className="mt-2 mb-1">FirstName: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.firstName}
              fullWidth={true}
            />
            <p className="mt-2 mb-1">Gender: </p>
            <Select
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.gender}
              fullWidth={true}
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
          <Button variant="outlined">
            Change Password
          </Button>
        ) : null}
        {type === modalTypes.UPDATE_PROFILE ? (
          <Button variant="outlined">
            Save Profile
          </Button>
        ) : null}
        <Button
          variant="outlined"
          color="error"
          onClick={() => onCloseModal()}
        >
          Cancle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect()(DashboardModalPage);
