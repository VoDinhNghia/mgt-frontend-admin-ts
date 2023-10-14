import React, { useEffect } from "react";
import { IpropModalSemester } from "../../../interfaces/semester.interface";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputSemesterForm,
  registerSchemaSemesterForm,
  yearSemesterOptions,
} from "../../../utils/semester.util";
import { modalTypes } from "../../../constants/constant";
import { semesterActions } from "../../../store/actions";
import ModalCommonPage from "../../commons/modal-common";
import TextFieldCommon from "../../commons/textfield-input";
import SelectReactCommon from "../../commons/select-react";

const ModalSemesterPage = (props: IpropModalSemester) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    semesterInfo = {},
    fetchSemesters,
    dispatch,
  } = props;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputSemesterForm>({
    resolver: zodResolver(registerSchemaSemesterForm),
  });

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputSemesterForm> = (
    values
  ) => {
    const { name, year } = values;
    dispatch({
      type: semesterActions.ADD_SEMESTER,
      payload: {
        name,
        year,
      },
    });
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputSemesterForm> = (
    values
  ) => {
    const { name, year } = values;
    dispatch({
      type: semesterActions.UPDATE_SEMESTER,
      id: semesterInfo?._id,
      payload: {
        name,
        year,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: semesterActions.DELETE_SEMESTER,
      id: semesterInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchSemesters();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset(semesterInfo);
  }, [isSubmitSuccessful, semesterInfo]);

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
        errors={errors}
        register={register}
        defaultValue={type === modalTypes.UPDATE ? semesterInfo?.name : ""}
        field="name"
      />
      <p className="mt-2">Year: </p>
      <SelectReactCommon
        errors={errors}
        control={control}
        field="year"
        options={yearSemesterOptions}
        defaultValue={
          type === modalTypes.UPDATE
            ? yearSemesterOptions?.find(
                (year) => year.value === semesterInfo?.year
              )
            : ""
        }
      />
      <Button type="submit" variant="contained" className="mt-4 w-100">
        Save
      </Button>
    </form>
  );

  const deleteContent = (
    <p>
      Are you want to delete this semester{" "}
      <b>{`${semesterInfo?.name} (${semesterInfo?.year})`}</b>
    </p>
  );

  return (
    <ModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      nameTitle="semester"
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
      onDelete={() => onDelete()}
    />
  );
};

export default connect()(ModalSemesterPage);
