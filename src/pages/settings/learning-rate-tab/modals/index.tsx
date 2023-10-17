import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IpropModalLearningRate } from "../../../../interfaces/setting.interface";
import { Button } from "@mui/material";
import { learningRateOption, modalTypes } from "../../../../constants/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputLearningRateForm,
  registerSchemaLearningRateForm,
} from "../../../../utils/setting.util";
import { settingActions } from "../../../../store/actions";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import TextFieldCommon from "../../../commons/textfield-input";
import SelectMuiCommon from "../../../commons/select-mui";

const LearningRateModalPage = (props: IpropModalLearningRate) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    learningRateInfo = {},
    dispatch,
    fetchLearningRate,
  } = props;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputLearningRateForm>({
    resolver: zodResolver(registerSchemaLearningRateForm),
  });

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputLearningRateForm> = (
    values
  ) => {
    const { name, type, maximum, minimum } = values;
    dispatch({
      type: settingActions.ADD_LEARNING_RATE,
      payload: {
        name,
        type,
        maximum,
        minimum,
      },
    });
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputLearningRateForm> = (
    values
  ) => {
    const { name, type, maximum, minimum } = values;
    dispatch({
      type: settingActions.UPDATE_LEARNING_RATE,
      id: learningRateInfo?._id,
      payload: {
        name,
        type,
        maximum,
        minimum,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: settingActions.DELETE_LEARNING_RATE,
      id: learningRateInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchLearningRate();
      onCloseModal();
    }, 70);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...learningRateInfo,
      minimum: learningRateInfo?.minimum?.toString(),
      maximum: learningRateInfo?.maximum?.toString(),
    });
  }, [isSubmitSuccessful, learningRateInfo]);

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
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
            defaultValue={learningRateInfo?.name || ""}
            errors={errors}
            register={register}
          />
          <p className="mt-2">Type: </p>
          <SelectMuiCommon
            field="type"
            defaultValue={learningRateInfo?.type || ""}
            errors={errors}
            register={register}
            options={learningRateOption}
            control={control}
          />
          <p className="mt-2">Minimum: </p>
          <TextFieldCommon
            field="minimum"
            defaultValue={learningRateInfo?.minimum || ""}
            errors={errors}
            register={register}
          />
          <p className="mt-2">Maximum: </p>
          <TextFieldCommon
            field="maximum"
            defaultValue={learningRateInfo?.minimum || ""}
            errors={errors}
            register={register}
          />
          <Button variant="contained" className="w-100 mt-4" type="submit">
            SAVE
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <p>
          Are you want to delete this <b>{learningRateInfo?.name}</b>?
        </p>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      content={content}
      nameTitle="learning rate"
    />
  );
};

export default connect()(LearningRateModalPage);
