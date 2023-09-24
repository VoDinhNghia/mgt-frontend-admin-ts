/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useState } from "react";
import { IpropUserMgtModal } from "../../../interfaces/user.interface";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  modalTypes,
  userGenderOptions,
  userRoleOptions,
  userStatusOptions,
} from "../../../constants/constant";
import { connect } from "react-redux";
import { userActions } from "../../../store/actions";
import { IeventOnchangeInput } from "../../../interfaces/common.interface";

const ModalUserMgtPage = (props: IpropUserMgtModal) => {
  const { isShowModal, onCloseModal, type, dispatch, fetchUsers, userInfo } =
    props;

  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  const addNewUser = () => {
    if (!email || !passWord || !lastName || !firstName || !role) {
      NotificationManager.error(
        "email, password, lasName, firstName and role must is provided!",
        "Add user",
        4000
      );
    } else {
      dispatch({
        type: userActions.ADD_USER,
        payload: {
          email,
          passWord,
          middleName,
          lastName,
          firstName,
          role,
          mobile,
          gender,
        },
      });
      fetchAndCloseModal();
    }
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchUsers();
      onCloseModal();
    }, 100);
  };

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new user" : null}
        {type === modalTypes.UPDATE ? "Update user info" : null}
        {type === modalTypes.DELETE ? "Delete user" : null}
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.ADD ? (
          <>
            <p>Email</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) => setEmail(e.target.value)}
            />
            <p className="mt-2">Password</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              type="password"
              onChange={(e: IeventOnchangeInput) => setPassword(e.target.value)}
            />
            <p className="mt-2">Role</p>
            <Select
              size="small"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) => setRole(e.target.value)}
            >
              {userRoleOptions.map((role, index) => {
                return (
                  <MenuItem value={role.value} key={`${index}-${role.value}`}>
                    {role.value}
                  </MenuItem>
                );
              })}
            </Select>
            <p className="mt-2">FirstName</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) =>
                setFirstName(e.target.value)
              }
            />
            <p className="mt-2">LastName</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) => setLastName(e.target.value)}
            />
            <p className="mt-2">MiddleName</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) =>
                setMiddleName(e.target.value)
              }
            />
            <p className="mt-2">Mobile</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) => setMobile(e.target.value)}
            />
            <p className="mt-2">Gender</p>
            <Select
              size="small"
              fullWidth={true}
              variant="outlined"
              onChange={(e: IeventOnchangeInput) => setGender(e.target.value)}
            >
              {userGenderOptions.map((gender, index) => {
                return (
                  <MenuItem
                    value={gender.value}
                    key={`${index}-${gender.value}`}
                  >
                    {gender.value}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        ) : null}
        {type === modalTypes.UPDATE ? (
          <>
            <p>Email: </p>
            <TextField
              variant="outlined"
              size="small"
              fullWidth={true}
              defaultValue={userInfo?.email}
            />
            <p className="mt-2">Role: </p>
            <Select
              variant="outlined"
              size="small"
              fullWidth={true}
              defaultValue={userInfo?.role}
            >
              {userRoleOptions.map((role, index) => {
                return (
                  <MenuItem value={role.value} key={`${index}-${role.value}`}>
                    {role.value}
                  </MenuItem>
                );
              })}
            </Select>
            <p className="mt-2">Status: </p>
            <Select
              variant="outlined"
              size="small"
              fullWidth={true}
              defaultValue={userInfo.status}
            >
              {userStatusOptions.map((status, index) => {
                return (
                  <MenuItem
                    key={`${index}-${status.value}`}
                    value={status.value}
                  >
                    {status.value}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        ) : null}
        {type === modalTypes.DELETE ? (
          <span>
            Are you want to delete user <b>{userInfo?.name}</b>?
          </span>
        ) : null}
      </DialogContent>
      <DialogActions>
        {type === modalTypes.UPDATE ? (
          <Button variant="outlined" size="small">
            Save
          </Button>
        ) : null}
        {type === modalTypes.DELETE ? (
          <Button variant="outlined" size="small" color="error">
            Yes
          </Button>
        ) : null}
        {type === modalTypes.ADD ? (
          <Button variant="outlined" size="small" onClick={() => addNewUser()}>
            Add
          </Button>
        ) : null}
        <Button
          variant="outlined"
          color="error"
          onClick={() => onCloseModal()}
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect()(ModalUserMgtPage);
