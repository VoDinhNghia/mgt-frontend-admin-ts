import React from "react";
import { IpropImportFilterUser } from "../../../interfaces/user.interface";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import {
  modalTypes,
  userRoleOptions,
  userStatusOptions,
} from "../../../constants/constant";
import { Form } from "react-bootstrap";

const FilterAndImportModal = (props: IpropImportFilterUser) => {
  const { type, isShowModal, onCloseModal } = props;

  return (
    <Dialog
      open={isShowModal}
      fullWidth={true}
      maxWidth="xs"
      onClose={() => onCloseModal()}
    >
      <DialogTitle>
        {type === modalTypes.IMPORT ? <h4>Import multi users</h4> : null}
        {type === modalTypes.FILTER ? <h4>Filter user</h4> : null}
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.IMPORT ? (
          <>
            <Form.Label>Select file csv:</Form.Label>
            <Form.Control type="file" />
          </>
        ) : null}
        {type === modalTypes.FILTER ? (
          <>
            <p>Role:</p>
            <Select size="small" variant="outlined" fullWidth={true}>
              {userRoleOptions.map((role, index) => {
                return (
                  <MenuItem key={`${index}-${role.value}`} value={role.value}>
                    {role.value}
                  </MenuItem>
                );
              })}
            </Select>
            <p className="mt-2">Status:</p>
            <Select size="small" variant="outlined" fullWidth={true}>
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
      </DialogContent>
      <DialogActions>
        {type === modalTypes.IMPORT ? (
          <Button variant="outlined" size="small">
            Import
          </Button>
        ) : null}
        {type === modalTypes.FILTER ? (
          <Button variant="outlined" size="small">
            Filter
          </Button>
        ) : null}
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => onCloseModal()}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect()(FilterAndImportModal);
