import React, { useState } from "react";
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
import {
  IeventOnchangeFile,
  IeventOnchangeInput,
} from "../../../interfaces/common.interface";
import { userActions } from "../../../store/actions";

const FilterAndImportModal = (props: IpropImportFilterUser) => {
  const { type, isShowModal, onCloseModal, dispatch, fetchUsers } = props;
  const [file, setFile] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const onFilter = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        status,
        role,
      },
    });
    closeModal();
  };

  const onImport = () => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch({
      type: userActions.IMPORT_USER,
      payload: formData,
    });
    setTimeout(() => {
      fetchUsers();
      onCloseModal();
    }, 100);
  };

  const closeModal = () => {
    setTimeout(() => {
      onCloseModal();
    }, 70);
  };

  return (
    <Dialog
      open={isShowModal}
      fullWidth={true}
      maxWidth="xs"
      onClose={() => onCloseModal()}
    >
      <DialogTitle>
        {type === modalTypes.IMPORT ? "Import multi users" : null}
        {type === modalTypes.FILTER ? "Filter user" : null}
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.IMPORT ? (
          <>
            <Form.Label>Select file csv:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e: IeventOnchangeFile) => setFile(e.target.files[0])}
            />
          </>
        ) : null}
        {type === modalTypes.FILTER ? (
          <>
            <p>Role:</p>
            <Select
              size="small"
              variant="outlined"
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) => setRole(e.target.value)}
            >
              {userRoleOptions.map((role, index) => {
                return (
                  <MenuItem key={`${index}-${role.value}`} value={role.value}>
                    {role.value}
                  </MenuItem>
                );
              })}
            </Select>
            <p className="mt-2">Status:</p>
            <Select
              size="small"
              variant="outlined"
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) => setStatus(e.target.value)}
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
      </DialogContent>
      <DialogActions>
        {type === modalTypes.IMPORT ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => onImport()}
          >
            Import
          </Button>
        ) : null}
        {type === modalTypes.FILTER ? (
          <Button variant="outlined" size="small" onClick={() => onFilter()}>
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
