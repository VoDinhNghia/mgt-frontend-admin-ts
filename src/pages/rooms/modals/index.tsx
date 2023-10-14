import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { connect } from "react-redux";
import { Button, TextField } from "@mui/material";
import { IpropModalRoom } from "../../../interfaces/room.interface";
import { modalTypes, roomOptions } from "../../../constants/constant";
import { roomActions } from "../../../store/actions";
import {
  registerSchemaRoomForm,
  IregisterInputRoomForm,
} from "../../../utils/room.util";
import ModalCommonPage from "../../commons/modal-common";
import SelectMuiCommon from "../../commons/select-mui";

const ModalRoomMgtPage = (props: IpropModalRoom) => {
  const {
    type,
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

  const onDelete = () => {
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

  const deleteContent = (
    <span>
      Are you want to delete this <b>{roomInfo?.name}</b>?
    </span>
  );
  const addUpdateContent = (
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
        defaultValue={type === modalTypes.UPDATE ? roomInfo?.name : null}
        error={!!errors["name"]}
        helperText={errors["name"] ? errors["name"].message : ""}
        {...register("name")}
      />
      <p className="mt-2">Type: </p>
      <SelectMuiCommon
        field="roomType"
        register={register}
        options={roomOptions}
        errors={errors}
        control={control}
        defaultValue={type === modalTypes.UPDATE ? roomInfo?.type : ""}
      />
      <p className="mt-2">Capacity: </p>
      <TextField
        size="small"
        type="number"
        fullWidth={true}
        defaultValue={type === modalTypes.UPDATE ? roomInfo?.capacity : ""}
        error={!!errors["capacity"]}
        helperText={errors["capacity"] ? errors["capacity"].message : ""}
        {...register("capacity")}
      />
      <p className="mt-2">Description: </p>
      <TextField
        size="small"
        type="textarea"
        multiline={true}
        rows={4}
        fullWidth={true}
        defaultValue={type === modalTypes.UPDATE ? roomInfo?.description : ""}
        error={!!errors["description"]}
        helperText={errors["description"] ? errors["description"].message : ""}
        {...register("description")}
      />
      <p className="mt-2">Air Conditioner: </p>
      <TextField
        size="small"
        type="text"
        fullWidth={true}
        defaultValue={
          type === modalTypes.UPDATE ? roomInfo?.divice?.airConditioner : ""
        }
        error={!!errors["airConditioner"]}
        helperText={
          errors["airConditioner"] ? errors["airConditioner"].message : ""
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
        helperText={errors["projector"] ? errors["projector"].message : ""}
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
  );

  const viewContent = (
    <p>
      <p>Air Conditioner: {roomInfo?.divice?.airConditioner}</p>
      <p>Projector: {roomInfo?.divice?.projector}</p>
      <p>Status: {roomInfo?.divice?.status}</p>
    </p>
  );

  return (
    <ModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      nameTitle="room"
      content={
        type === modalTypes.DELETE
          ? deleteContent
          : type === modalTypes.VIEW
          ? viewContent
          : addUpdateContent
      }
      onDelete={() => onDelete()}
    />
  );
};

export default connect()(ModalRoomMgtPage);
