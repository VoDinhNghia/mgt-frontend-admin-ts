import React from "react";
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
} from "../../../constants/constant";

const ModalUserMgtPage = (props: IpropUserMgtModal) => {
  const { isShowModal, onCloseModal, type } = props;

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.ADD ? <h4>Add new user</h4> : null}
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.ADD ? (
          <>
            <p>Email</p>
            <TextField size="small" fullWidth={true} variant="outlined" />
            <p className="mt-2">Password</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              type="password"
            />
            <p className="mt-2">Role</p>
            <Select size="small" fullWidth={true} variant="outlined">
              {userRoleOptions.map((role, index) => {
                return (
                  <MenuItem value={role.value} key={`${index}-${role.value}`}>
                    {role.value}
                  </MenuItem>
                );
              })}
            </Select>
            <p className="mt-2">FirstName</p>
            <TextField size="small" fullWidth={true} variant="outlined" />
            <p className="mt-2">LastName</p>
            <TextField size="small" fullWidth={true} variant="outlined" />
            <p className="mt-2">MiddleName</p>
            <TextField size="small" fullWidth={true} variant="outlined" />
            <p className="mt-2">Mobile</p>
            <TextField size="small" fullWidth={true} variant="outlined" />
            <p className="mt-2">Gender</p>
            <Select size="small" fullWidth={true} variant="outlined">
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
      </DialogContent>
      <DialogActions>
        {type === modalTypes.ADD ? (
          <Button variant="outlined" size="small">
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

export default ModalUserMgtPage;
