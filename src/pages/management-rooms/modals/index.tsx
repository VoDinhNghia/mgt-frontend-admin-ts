import React from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { IpropModalRoom } from "../../../interfaces/room.interface";
import { modalTypes, roomOptions } from "../../../constants/constant";

const ModalRoomMgtPage = (props: IpropModalRoom) => {
  const { type, size = "sm", isShowModal, onCloseModal, roomInfo = {} } = props;

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth={size}
      className={type === modalTypes.VIEW ? "fs-6" : undefined}
    >
      <DialogTitle>
        {type === modalTypes.VIEW ? "View detail divice" : null}
        {type === modalTypes.UPDATE ? "Update room" : null}
        {type === modalTypes.DELETE ? "Delete room" : null}
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.VIEW ? (
          <>
            <p>Air Conditioner: {roomInfo?.divice?.airConditioner}</p>
            <p>Projector: {roomInfo?.divice?.projector}</p>
            <p>Status: {roomInfo?.divice?.status}</p>
          </>
        ) : null}
        {type === modalTypes.UPDATE ? (
          <>
            <p>Name: </p>
            <TextField
              size="small"
              type="text"
              fullWidth={true}
              defaultValue={roomInfo?.name}
            />
            <p className="mt-2">Type: </p>
            <Select size="small" fullWidth={true} defaultValue={roomInfo?.type}>
              {roomOptions.map((room) => {
                return (
                  <MenuItem key={room?.value} value={room?.value}>
                    {room?.label}
                  </MenuItem>
                );
              })}
            </Select>
            <p className="mt-2">Capacity: </p>
            <TextField
              size="small"
              type="number"
              fullWidth={true}
              defaultValue={roomInfo?.capacity}
            />
            <p className="mt-2">Description: </p>
            <TextField
              size="small"
              type="textarea"
              multiline={true}
              rows={4}
              fullWidth={true}
              defaultValue={roomInfo?.description}
            />
          </>
        ) : null}
        {type === modalTypes.DELETE ? (
          <span>
            Are you want to delete this <b>{roomInfo?.name}</b>?
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

export default connect()(ModalRoomMgtPage);
