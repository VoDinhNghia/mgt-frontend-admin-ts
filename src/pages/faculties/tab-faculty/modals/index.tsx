import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import { connect } from "react-redux";
import { IpropModalFaculty } from "../../../../interfaces/faculty.interface";
import { modalTypes } from "../../../../constants/constant";

const ModalFacultyPage = (props: IpropModalFaculty) => {
  const { isShowModal, type, onCloseModal } = props;
  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new faculty" : ""}
        {type === modalTypes.DELETE ? "Delete faculty" : ""}
        {type === modalTypes.UPDATE ? "Update faculty" : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        {type === modalTypes.DELETE ? (
          <Button variant="contained" color="error" size="small">
            Yes
          </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
};

export default connect()(ModalFacultyPage);
