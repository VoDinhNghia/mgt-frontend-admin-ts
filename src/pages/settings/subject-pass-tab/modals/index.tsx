import React, { useEffect } from "react";
import { IpropModalSubjectPass } from "../../../../interfaces/setting.interface";
import { connect } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  modalTypes,
  subjectPassSettingOptions,
} from "../../../../constants/constant";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputSubjectPassForm,
  registerSchemaSubjectPassForm,
} from "../../../../utils/setting.util";
import { settingActions } from "../../../../store/actions";

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

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new subject pass" : ""}
        {type === modalTypes.UPDATE ? "Update subject pass" : ""}
        {type === modalTypes.DELETE ? "Delete subject pass" : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.DELETE ? (
          <p>
            Are you want to delete this <b>{subjectPassInfo?.name}</b>?
          </p>
        ) : (
          ""
        )}
        {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
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
                type === modalTypes.UPDATE ? subjectPassInfo?.name : null
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
                      type === modalTypes.UPDATE ? subjectPassInfo?.type : ""
                    }
                    error={!!errors["type"]}
                    {...register("type")}
                  >
                    {subjectPassSettingOptions.map((sub) => {
                      return (
                        <MenuItem key={sub?.value} value={sub?.value}>
                          {sub?.label}
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
            <p className="mt-2">Condition: </p>
            <TextField
              size="small"
              type="number"
              fullWidth={true}
              defaultValue={
                type === modalTypes.UPDATE ? subjectPassInfo?.condition : ""
              }
              error={!!errors["condition"]}
              helperText={
                errors["condition"] ? errors["condition"].message : ""
              }
              {...register("condition")}
            />
            <Button variant="contained" className="w-100 mt-4" type="submit">
              SAVE
            </Button>
          </form>
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions>
        {type === modalTypes.DELETE ? (
          <Button variant="contained" color="error" onClick={() => onDelete()}>
            Yes
          </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
};

export default connect()(ModalSubjectPassPage);
