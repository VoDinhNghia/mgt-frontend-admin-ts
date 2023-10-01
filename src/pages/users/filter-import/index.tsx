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
  IconButton,
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
  const [state, setState] = useState({
    file: "",
    role: "",
    status: "",
  });

  const onFilter = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        status: state.status,
        role: state.role,
      },
    });
    closeModal();
  };

  const onImport = () => {
    const formData = new FormData();
    formData.append("file", state.file);
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
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.IMPORT ? (
          <form onSubmit={() => onImport()}>
            <Form.Label>Select file csv:</Form.Label>
            <Form.Control
              type="file"
              required={true}
              onChange={(e: IeventOnchangeFile) =>
                setState({ ...state, file: e.target.files[0] })
              }
            />
            <Button variant="contained" className="mt-4 w-100" type="submit">
              Import
            </Button>
          </form>
        ) : null}
        {type === modalTypes.FILTER ? (
          <>
            <p>Role:</p>
            <Select
              size="small"
              variant="outlined"
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, role: e.target.value })
              }
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
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, status: e.target.value })
              }
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
        {type === modalTypes.FILTER ? (
          <Button
            variant="contained"
            className="w-100"
            onClick={() => onFilter()}
          >
            Filter
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default connect()(FilterAndImportModal);
