import React, { useEffect } from "react";
import { IpropModalSubjectPass } from "../../../../interfaces/setting.interface";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import {
  inputTypes,
  modalTypes,
  subjectPassSettingOptions,
} from "../../../../constants/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputSubjectPassForm,
  registerSchemaSubjectPassForm,
} from "../../../../utils/setting.util";
import { settingActions } from "../../../../store/actions";
import DialogCommonPage from "../../../commons/dialog-common";
import TextFieldCommon from "../../../commons/textfield-input";
import SelectMuiCommon from "../../../commons/select-mui";

const ModalSubjectPassPage = (props: IpropModalSubjectPass) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    subjectPassInfo = {},
    dispatch,
    fetchSubjectPass,
  } = props;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputSubjectPassForm>({
    resolver: zodResolver(registerSchemaSubjectPassForm),
  });

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputSubjectPassForm> = (
    values
  ) => {
    const { name, type, condition } = values;
    dispatch({
      type: settingActions.ADD_SUBJECT_PASS,
      payload: {
        name,
        type,
        condition,
      },
    });
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputSubjectPassForm> = (
    values
  ) => {
    const { name, type, condition } = values;
    dispatch({
      type: settingActions.UPDATE_SUBJECT_PASS,
      id: subjectPassInfo?._id,
      payload: {
        name,
        type,
        condition,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: settingActions.DELETE_SUBJECT_PASS,
      id: subjectPassInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchSubjectPass();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...subjectPassInfo,
      condition: subjectPassInfo?.condition?.toString(),
    });
  }, [isSubmitSuccessful, subjectPassInfo]);

  const deleteContent = (
    <p>
      Are you want to delete this <b>{subjectPassInfo?.name}</b>?
    </p>
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
        defaultValue={subjectPassInfo?.name || ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Type: </p>
      <SelectMuiCommon
        field="type"
        options={subjectPassSettingOptions}
        errors={errors}
        register={register}
        control={control}
        defaultValue={subjectPassInfo?.type || ""}
      />
      <p className="mt-2">Condition: </p>
      <TextFieldCommon
        field="condition"
        type={inputTypes.NUMBER}
        defaultValue={subjectPassInfo?.condition || ""}
        errors={errors}
        register={register}
      />
      <Button variant="contained" className="w-100 mt-4" type="submit">
        SAVE
      </Button>
    </form>
  );

  return (
    <DialogCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
      nameTitle="subject pass"
    />
  );
};

export default connect()(ModalSubjectPassPage);
