/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useState } from "react";
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
import { roomActions } from "../../../store/actions";
import {
  IeventOnchangeInput,
  IeventOnchangeSelect,
} from "../../../interfaces/common.interface";

const ModalRoomMgtPage = (props: IpropModalRoom) => {
  const {
    type,
    size = "sm",
    isShowModal,
    onCloseModal,
    roomInfo = {},
    dispatch,
    fetchRooms,
  } = props;
  const [name, setName] = useState(roomInfo?.name);
  const [roomType, setType] = useState(roomInfo?.type);
  const [capacity, setCapacity] = useState(roomInfo?.capacity);
  const [description, setDescription] = useState(roomInfo?.description);
  const [airConditioner, setAirConditioner] = useState("");
  const [projector, setProjector] = useState("");
  const [status, setStatus] = useState("");

  const addNewRoom = () => {
    if (!name || !roomType || !capacity) {
      NotificationManager.error(
        "name, room type and capacity must is provided!",
        "Add room",
        4000
      );
    } else {
      dispatch({
        type: roomActions.ADD_ROOM,
        payload: {
          name,
          type: roomType,
          capacity,
          description,
          divice: {
            airConditioner,
            projector,
            status,
          },
        },
      });
    }
    fetchAndCloseModal();
  };

  const updateRoom = () => {
    dispatch({
      type: roomActions.UPDATE_ROOM,
      id: roomInfo?._id,
      payload: {
        name,
        type: roomType,
        capacity,
        description,
      },
    });
    fetchAndCloseModal();
  };

  const deleteRoom = () => {
    dispatch({
      type: roomActions.DELETE_ROOM,
      id: roomInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchRooms();
      onCloseModal();
    }, 100);
  };

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
        {type === modalTypes.ADD ? "Add new room" : null}
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.VIEW ? (
          <>
            <p>Air Conditioner: {roomInfo?.divice?.airConditioner}</p>
            <p>Projector: {roomInfo?.divice?.projector}</p>
            <p>Status: {roomInfo?.divice?.status}</p>
          </>
        ) : null}
        {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
          <>
            <p>Name: </p>
            <TextField
              size="small"
              type="text"
              fullWidth={true}
              defaultValue={type === modalTypes.UPDATE ? roomInfo?.name : null}
              onChange={(e: IeventOnchangeInput) => setName(e.target.value)}
            />
            <p className="mt-2">Type: </p>
            <Select
              size="small"
              fullWidth={true}
              defaultValue={type === modalTypes.UPDATE ? roomInfo?.type : null}
              onChange={(e: IeventOnchangeSelect) => setType(e.target.value)}
            >
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
              defaultValue={
                type === modalTypes.UPDATE ? roomInfo?.capacity : null
              }
              onChange={(e: IeventOnchangeSelect) =>
                setCapacity(e.target.value)
              }
            />
            <p className="mt-2">Description: </p>
            <TextField
              size="small"
              type="textarea"
              multiline={true}
              rows={4}
              fullWidth={true}
              defaultValue={
                type === modalTypes.UPDATE ? roomInfo?.description : null
              }
              onChange={(e: IeventOnchangeInput) =>
                setDescription(e.target.value)
              }
            />
          </>
        ) : null}
        {type === modalTypes.ADD ? (
          <>
            <p className="mt-2">Air Conditioner: </p>
            <TextField
              size="small"
              type="text"
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setAirConditioner(e.target.value)
              }
            />
            <p className="mt-2">Projector: </p>
            <TextField
              size="small"
              type="text"
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setProjector(e.target.value)
              }
            />
            <p className="mt-2">Status: </p>
            <TextField
              size="small"
              type="text"
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) => setStatus(e.target.value)}
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
        {type === modalTypes.ADD ? (
          <Button variant="outlined" size="small" onClick={() => addNewRoom()}>
            Add
          </Button>
        ) : null}
        {type === modalTypes.UPDATE ? (
          <Button variant="outlined" size="small" onClick={() => updateRoom()}>
            Save
          </Button>
        ) : null}
        {type === modalTypes.DELETE ? (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => deleteRoom()}
          >
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
