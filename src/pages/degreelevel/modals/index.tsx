import React, { useEffect } from "react";
import DialogModalCommonPage from "../../commons/dialog-mui";
import { IpropsModalDegreelevel } from "../../../interfaces/degreelevel.interface";
import { connect } from "react-redux";
import { inputTypes, modalTypes } from "../../../constants/constant";
import { Button } from "@mui/material";
import TextFieldCommon from "../../commons/textfield-input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputDegreelevelForm,
  registerSchemaDegreelevelForm,
} from "../../../utils/degreelevel.util";
import { degreelevelActions } from "../../../store/actions";

const ModalDegreelevelPage = (props: IpropsModalDegreelevel) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    degreelevelInfo = {},
    dispatch,
    fetchDegreelevels,
  } = props;

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterInputDegreelevelForm>({
    resolver: zodResolver(registerSchemaDegreelevelForm),
  });

  const handleAdd: SubmitHandler<IregisterInputDegreelevelForm> = (values) => {
    dispatch({
      type: degreelevelActions.ADD_DEGREELEVEL,
      payload: {
        name: values?.name,
        description: values?.description,
      },
    });
    fetchAndCloseModal();
  };

  const handleUpdate: SubmitHandler<IregisterInputDegreelevelForm> = (
    values
  ) => {
    dispatch({
      type: degreelevelActions.UPDATE_DEGREELEVEL,
      id: degreelevelInfo?._id,
      payload: {
        name: values?.name,
        description: values?.description,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: degreelevelActions.DELETE_DEGREELEVEL,
      id: degreelevelInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchDegreelevels();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset(degreelevelInfo);
  }, [isSubmitSuccessful, degreelevelInfo]);

  const content = (
    <div>
      {type === modalTypes.DELETE ? (
        <p>
          Are you want to delete this <b>{degreelevelInfo?.name}</b>?
        </p>
      ) : (
        ""
      )}
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form
          onSubmit={
            type === modalTypes.ADD
              ? handleSubmit(handleAdd)
              : handleSubmit(handleUpdate)
          }
        >
          <p>Name: </p>
          <TextFieldCommon
            field="name"
            errors={errors}
            register={register}
            defaultValue={degreelevelInfo?.name || ""}
          />
          <p className="mt-2">Description: </p>
          <TextFieldCommon
            field="description"
            type={inputTypes.TEXT_AREA}
            rows={5}
            errors={errors}
            register={register}
            defaultValue={degreelevelInfo?.description || ""}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            className="mt-3 w-100"
          >
            Save
          </Button>
        </form>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      nameTitle="degreelevel"
      onCloseModal={() => onCloseModal()}
      content={content}
      onDelete={() => onDelete()}
    />
  );
};

export default connect()(ModalDegreelevelPage);
