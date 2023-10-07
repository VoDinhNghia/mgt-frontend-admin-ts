import React from "react";
import { connect } from "react-redux";
import { IpropModalLearningRate } from "../../../../interfaces/setting.interface";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { modalTypes } from "../../../../constants/constant";

const LearningRateModalPage = (props: IpropModalLearningRate) => {
  const { type, isShowModal, onCloseModal, learningRateInfo = {} } = props;

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new learning rate" : ""}
        {type === modalTypes.UPDATE ? "Update learning rate" : ""}
        {type === modalTypes.DELETE ? "Delete learning rate" : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.DELETE ? (
          <p>
            Are you want to delete this <b>{learningRateInfo?.name}</b>?
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

export default connect()(LearningRateModalPage);
