import React, { useEffect } from "react";
import { IpropModalSemester } from "../../../interfaces/semester.interface";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputSemesterForm,
  registerSchemaSemesterForm,
} from "../../../utils/semester.util";
import {
  inputTypes,
  modalTypes,
  yearSemesterOptions,
} from "../../../constants/constant";
import { semesterActions } from "../../../store/actions";
import DialogModalCommonPage from "../../commons/dialog-mui";
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
            errors={errors}
            register={register}
            defaultValue={semesterInfo?.name || ""}
            field="name"
            type={inputTypes.TEXT}
          />
          <p className="mt-2">Year: </p>
          <SelectReactCommon
            errors={errors}
            control={control}
            field="year"
            options={yearSemesterOptions}
            defaultValue={
              yearSemesterOptions?.find(
                (year) => year.value === semesterInfo?.year
              ) || ""
            }
          />
          <Button type="submit" variant="contained" className="mt-4 w-100">
            Save
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <p>
          Are you want to delete this semester{" "}
          <b>{`${semesterInfo?.name} (${semesterInfo?.year})`}</b>
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
      nameTitle="semester"
      content={content}
      onDelete={() => onDelete()}
    />
  );
};

export default connect()(ModalSemesterPage);
