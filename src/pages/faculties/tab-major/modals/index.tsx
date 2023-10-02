import React from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import { IpropModalMajor } from "../../../../interfaces/faculty.interface";
import { modalTypes } from "../../../../constants/constant";

const MajorModalPage = (props: IpropModalMajor) => {
  const { type, isShowModal, onCloseModal, majorInfo } = props;

  return (
    <Dialog
      open={isShowModal}
      fullWidth={true}
      maxWidth="xs"
      onClose={() => onCloseModal()}
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new major" : ""}
        {type === modalTypes.UPDATE ? "Update major" : ""}
        {type === modalTypes.DELETE ? "Delete major" : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
          <form>
            <Button type="submit" variant="contained" className="mt-4 w-100">
              Save
            </Button>
          </form>
        ) : (
          ""
        )}
        {type === modalTypes.DELETE ? (
          <p>
            Are you want to delete this major <b>{majorInfo?.name}</b>
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

export default connect()(MajorModalPage);
