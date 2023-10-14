import React, { useEffect } from "react";
import { IpropModalMoneyCredit } from "../../../../interfaces/setting.interface";
import { connect } from "react-redux";
import {
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
import { semesterActions, settingActions } from "../../../../store/actions";
import ModalCommonPage from "../../../commons/modal-common";

const ModalMoneyCreditPage = (props: IpropModalMoneyCredit) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    moneyCreditInfo = {},
    listSemesters = [],
    fetchMoneyCredit,
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
    const { name, moneyPerCredit, semester } = values;
    dispatch({
      type: settingActions.ADD_MONEY_CREDIT,
      payload: {
        name,
        moneyPerCredit,
        semester,
      },
    });
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputMoneyCreditForm> = (
    values
  ) => {
    const { name, moneyPerCredit, semester } = values;
    dispatch({
      type: settingActions.UPDATE_MONEY_CREDIT,
      id: moneyCreditInfo?._id,
      payload: {
        name,
        moneyPerCredit,
        semester,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: settingActions.UPDATE_MONEY_CREDIT,
      id: moneyCreditInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchSemester = () => {
    dispatch({
      type: semesterActions.GET_LIST_SEMESTER,
    });
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchMoneyCredit();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...moneyCreditInfo,
      semester: moneyCreditInfo?.semester?._id,
      moneyPerCredit: moneyCreditInfo?.moneyPerCredit?.toString(),
    });
    fetchSemester();
  }, [isSubmitSuccessful, moneyCreditInfo]);

  const deleteContent = (
    <p>
      Are you want to delete this <b>{moneyCreditInfo?.name}</b>?
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
        defaultValue={type === modalTypes.UPDATE ? moneyCreditInfo?.name : null}
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
                type === modalTypes.UPDATE ? moneyCreditInfo?.semester?._id : ""
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
          type === modalTypes.UPDATE ? moneyCreditInfo?.moneyPerCredit : ""
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
  );

  return (
    <ModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
      nameTitle="money credit"
    />
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listSemesters: state.SemesterReducer.listSemesters,
  };
};

export default connect(mapStateToProps)(ModalMoneyCreditPage);
