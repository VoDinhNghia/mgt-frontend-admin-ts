import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import { connect } from "react-redux";
import { IpropModalCourse } from "../../../interfaces/course.interface";
import { modalTypes } from "../../../constants/constant";

const ModalCoursePage = (props: IpropModalCourse) => {
  const { type, isShowModal, onCloseModal, courseInfo = {} } = props;

  return (
    <Dialog
      open={isShowModal}
      fullWidth={true}
      maxWidth="xs"
      onClose={() => onCloseModal()}
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new course" : ""}
        {type === modalTypes.UPDATE ? "Update course" : ""}
        {type === modalTypes.DELETE ? "Delete course" : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.DELETE ? (
          <p>
            Are you want to delete this <b>{courseInfo?.name}</b>?
          </p>
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions>
        {type === modalTypes.DELETE ? (
          <Button variant="contained" color="error">
            Yes
          </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
};

export default connect()(ModalCoursePage);
