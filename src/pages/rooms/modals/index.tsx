import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { IpropModalRoom } from "../../../interfaces/room.interface";
import {
  inputTypes,
  modalTypes,
  roomOptions,
} from "../../../constants/constant";
import { roomActions } from "../../../store/actions";
import {
  registerSchemaRoomForm,
  IregisterInputRoomForm,
} from "../../../utils/room.util";
import ModalCommonPage from "../../commons/modal-common";
import SelectMuiCommon from "../../commons/select-mui";
import TextFieldCommon from "../../commons/textfield-input";

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
      <TextFieldCommon
        field="name"
        defaultValue={type === modalTypes.UPDATE ? roomInfo?.name : ""}
        errors={errors}
        register={register}
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
      <TextFieldCommon
        field="capacity"
        type={inputTypes.NUMBER}
        defaultValue={type === modalTypes.UPDATE ? roomInfo?.capacity : ""}
        register={register}
        errors={errors}
      />
      <p className="mt-2">Description: </p>
      <TextFieldCommon
        field="description"
        type={inputTypes.TEXT_AREA}
        defaultValue={type === modalTypes.UPDATE ? roomInfo?.description : ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Air Conditioner: </p>
      <TextFieldCommon
        field="airConditioner"
        defaultValue={
          type === modalTypes.UPDATE ? roomInfo?.divice?.airConditioner : ""
        }
        errors={errors}
        register={register}
      />
      <p className="mt-2">Projector: </p>
      <TextFieldCommon
        field="projector"
        defaultValue={
          type === modalTypes.UPDATE ? roomInfo?.divice?.projector : ""
        }
        errors={errors}
        register={register}
      />
      <p className="mt-2">Status: </p>
      <TextFieldCommon
        field="status"
        defaultValue={
          type === modalTypes.UPDATE ? roomInfo?.divice?.status : ""
        }
        errors={errors}
        register={register}
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
