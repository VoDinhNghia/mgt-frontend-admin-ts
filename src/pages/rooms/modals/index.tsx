import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { connect } from "react-redux";
import "./index.css";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { IpropModalRoom } from "../../../interfaces/room.interface";
import { modalTypes, roomOptions } from "../../../constants/constant";
import { roomActions } from "../../../store/actions";
import {
  registerSchemaRoomForm,
  IregisterInputRoomForm,
} from "../../../utils/room.util";

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
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputRoomForm>({
    resolver: zodResolver(registerSchemaRoomForm),
  });

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputRoomForm> = (
    values
  ) => {
    const {
      name,
      roomType,
      capacity,
      description,
      airConditioner,
      projector,
      status,
    } = values;
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
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputRoomForm> = (
    values
  ) => {
    const {
      name,
      roomType,
      capacity,
      description,
      airConditioner,
      projector,
      status,
    } = values;
    dispatch({
      type: roomActions.UPDATE_ROOM,
      id: roomInfo?._id,
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


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...roomInfo,
      capacity: roomInfo?.capacity?.toString(),
      status: roomInfo?.divice?.status?.toString(),
    });
  }, [isSubmitSuccessful, roomInfo]);

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
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
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
            <form
              onSubmit={
                type === modalTypes.ADD
                  ? handleSubmit(onSubmitHandlerAdd)
                  : handleSubmit(onSubmitHandlerUpdate)
              }
            >
              <p>Name: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? roomInfo?.name : null
                }
                error={!!errors["name"]}
                helperText={errors["name"] ? errors["name"].message : ""}
                {...register("name")}
              />
              <p className="mt-2">Type: </p>
              <FormControl
                fullWidth={true}
                size="small"
                error={Boolean(errors["roomType"])}
              >
                <Controller
                  render={() => (
                    <Select
                      size="small"
                      fullWidth={true}
                      defaultValue={
                        type === modalTypes.UPDATE ? roomInfo?.type : ""
                      }
                      error={!!errors["roomType"]}
                      {...register("roomType")}
                    >
                      {roomOptions.map((room) => {
                        return (
                          <MenuItem key={room?.value} value={room?.value}>
                            {room?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                  name="roomType"
                  control={control}
                />
                <FormHelperText>
                  {errors["roomType"] ? errors["roomType"].message : ""}
                </FormHelperText>
              </FormControl>
              <p className="mt-2">Capacity: </p>
              <TextField
                size="small"
                type="number"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? roomInfo?.capacity : ""
                }
                error={!!errors["capacity"]}
                helperText={
                  errors["capacity"] ? errors["capacity"].message : ""
                }
                {...register("capacity")}
              />
              <p className="mt-2">Description: </p>
              <TextField
                size="small"
                type="textarea"
                multiline={true}
                rows={4}
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? roomInfo?.description : ""
                }
                error={!!errors["description"]}
                helperText={
                  errors["description"] ? errors["description"].message : ""
                }
                {...register("description")}
              />
              <p className="mt-2">Air Conditioner: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE
                    ? roomInfo?.divice?.airConditioner
                    : ""
                }
                error={!!errors["airConditioner"]}
                helperText={
                  errors["airConditioner"]
                    ? errors["airConditioner"].message
                    : ""
                }
                {...register("airConditioner")}
              />
              <p className="mt-2">Projector: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? roomInfo?.divice?.projector : ""
                }
                error={!!errors["projector"]}
                helperText={
                  errors["projector"] ? errors["projector"].message : ""
                }
                {...register("projector")}
              />
              <p className="mt-2">Status: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? roomInfo?.divice?.status : ""
                }
                error={!!errors["status"]}
                helperText={errors["status"] ? errors["status"].message : ""}
                {...register("status")}
              />
              <Button type="submit" variant="contained" className="mt-4 w-100">
                SAVE
              </Button>
            </form>
          </>
        ) : null}
        {type === modalTypes.DELETE ? (
          <span>
            Are you want to delete this <b>{roomInfo?.name}</b>?
          </span>
        ) : null}
      </DialogContent>
      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );
};

export default connect()(ModalRoomMgtPage);
