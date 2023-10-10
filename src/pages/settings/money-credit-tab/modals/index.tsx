import React, { useEffect } from "react";
import { IpropModalMoneyCredit } from "../../../../interfaces/setting.interface";
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
import { modalTypes } from "../../../../constants/constant";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputMoneyCreditForm,
  handleSemesterOptions,
  registerSchemaMoneyCreditForm,
} from "../../../../utils/setting.util";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { semesterActions } from "../../../../store/actions";

const ModalMoneyCreditPage = (props: IpropModalMoneyCredit) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    moneyCreditInfo = {},
    listSemesters = [],
    dispatch,
  } = props;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputMoneyCreditForm>({
    resolver: zodResolver(registerSchemaMoneyCreditForm),
  });

  const semesterOptions = handleSemesterOptions(listSemesters);

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputMoneyCreditForm> = (
    values
  ) => {
    console.log("values", values);
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputMoneyCreditForm> = (
    values
  ) => {
    console.log("values", values);
  };

  const fetchSemester = () => {
    dispatch({
      type: semesterActions.GET_LIST_SEMESTER,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset(moneyCreditInfo);
    fetchSemester();
  }, [isSubmitSuccessful, moneyCreditInfo]);

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new money credit" : ""}
        {type === modalTypes.UPDATE ? "Update money credit" : ""}
        {type === modalTypes.DELETE ? "Delete money credit" : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.DELETE ? (
          <p>
            Are you want to delete this <b>{moneyCreditInfo?.name}</b>?
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
                type === modalTypes.UPDATE ? moneyCreditInfo?.name : null
              }
              error={!!errors["name"]}
              helperText={errors["name"] ? errors["name"].message : ""}
              {...register("name")}
            />
            <p className="mt-2">Type: </p>
            <FormControl
              fullWidth={true}
              size="small"
              error={Boolean(errors["semester"])}
            >
              <Controller
                render={() => (
                  <Select
                    size="small"
                    fullWidth={true}
                    defaultValue={
                      type === modalTypes.UPDATE
                        ? moneyCreditInfo?.semester?._id
                        : ""
                    }
                    error={!!errors["semester"]}
                    {...register("semester")}
                  >
                    {semesterOptions.map((semester) => {
                      return (
                        <MenuItem key={semester?.value} value={semester?.value}>
                          {semester?.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
                name="semester"
                control={control}
              />
              <FormHelperText>
                {errors["semester"] ? errors["semester"].message : ""}
              </FormHelperText>
            </FormControl>
            <p className="mt-2">Money Per Credit: </p>
            <TextField
              size="small"
              type="number"
              fullWidth={true}
              defaultValue={
                type === modalTypes.UPDATE ? moneyCreditInfo?.condition : ""
              }
              error={!!errors["moneyPerCredit"]}
              helperText={
                errors["moneyPerCredit"] ? errors["moneyPerCredit"].message : ""
              }
              {...register("moneyPerCredit")}
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
          <Button variant="contained" color="error">
            Yes
          </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listSemesters: state.SemesterReducer.listSemesters,
  };
};

export default connect(mapStateToProps)(ModalMoneyCreditPage);
