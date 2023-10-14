import React from "react";
import "./index.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import { modalTypes } from "../../../constants/constant";
import { ImodalCommon } from "../../../interfaces/common.interface";

const ModalCommonPage = (props: ImodalCommon) => {
  const { type, isShowModal, onCloseModal, nameTitle, content, onDelete } = props;

  return (
    <Dialog
      open={isShowModal}
      fullWidth={true}
      maxWidth="xs"
      onClose={() => onCloseModal()}
    >
      <DialogTitle>
        {type === modalTypes.ADD ? `Add new ${nameTitle}` : ""}
        {type === modalTypes.UPDATE ? `Update ${nameTitle}` : ""}
        {type === modalTypes.DELETE ? `Delete ${nameTitle}` : ""}
        {type === modalTypes.VIEW ? `View Detail ${nameTitle}` : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        {type === modalTypes.DELETE ? (
          <Button variant="contained" color="error" onClick={() => onDelete()}>
            Yes
          </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalCommonPage;
