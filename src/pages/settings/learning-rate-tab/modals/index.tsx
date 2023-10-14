import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IpropModalLearningRate } from "../../../../interfaces/setting.interface";
import {
  Button,
  FormHelperText,
  FormControl,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { learningRateOption, modalTypes } from "../../../../constants/constant";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputLearningRateForm,
  registerSchemaLearningRateForm,
} from "../../../../utils/setting.util";
import { settingActions } from "../../../../store/actions";
import ModalCommonPage from "../../../commons/modal-common";

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

  const deleteContent = (
    <p>
      Are you want to delete this <b>{learningRateInfo?.name}</b>?
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
      <TextField
        size="small"
        type="text"
        fullWidth={true}
        defaultValue={
          type === modalTypes.UPDATE ? learningRateInfo?.name : null
        }
        error={!!errors["name"]}
        helperText={errors["name"] ? errors["name"].message : ""}
        {...register("name")}
      />
      <p className="mt-2">Type: </p>
      <FormControl
        fullWidth={true}
        size="small"
        error={Boolean(errors["type"])}
      >
        <Controller
          render={() => (
            <Select
              size="small"
              fullWidth={true}
              defaultValue={
                type === modalTypes.UPDATE ? learningRateInfo?.type : ""
              }
              error={!!errors["type"]}
              {...register("type")}
            >
              {learningRateOption.map((lear) => {
                return (
                  <MenuItem key={lear?.value} value={lear?.value}>
                    {lear?.label}
                  </MenuItem>
                );
              })}
            </Select>
          )}
          name="type"
          control={control}
        />
        <FormHelperText>
          {errors["type"] ? errors["type"].message : ""}
        </FormHelperText>
      </FormControl>
      <p className="mt-2">Minimum: </p>
      <TextField
        size="small"
        fullWidth={true}
        defaultValue={
          type === modalTypes.UPDATE ? learningRateInfo?.minimum : ""
        }
        error={!!errors["minimum"]}
        helperText={errors["minimum"] ? errors["minimum"].message : ""}
        {...register("minimum")}
      />
      <p className="mt-2">Maximum: </p>
      <TextField
        size="small"
        fullWidth={true}
        defaultValue={
          type === modalTypes.UPDATE ? learningRateInfo?.maximum : ""
        }
        error={!!errors["maximum"]}
        helperText={errors["maximum"] ? errors["maximum"].message : ""}
        {...register("maximum")}
      />
      <Button variant="contained" className="w-100 mt-4" type="submit">
        SAVE
      </Button>
    </form>
  );

  return (
    <ModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
      nameTitle="learning rate"
    />
  );
};

export default connect()(LearningRateModalPage);
