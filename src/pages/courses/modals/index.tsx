import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IpropModalCourse } from "../../../interfaces/course.interface";
import {
  inputTypes,
  modalTypes,
  yearSemesterOptions,
} from "../../../constants/constant";
import DialogModalCommonPage from "../../commons/dialog-mui";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputCourseForm,
  registerSchemaCourseForm,
} from "../../../utils/course.util";
import { Button } from "@mui/material";
import TextFieldCommon from "../../commons/textfield-input";
import SelectReactCommon from "../../commons/select-react";

const ModalCoursePage = (props: IpropModalCourse) => {
  const { type, isShowModal, onCloseModal, courseInfo = {} } = props;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputCourseForm>({
    resolver: zodResolver(registerSchemaCourseForm),
  });

  const onDelete = () => {
    alert("Delete");
  };

  const onHandleSubmitAdd: SubmitHandler<IregisterInputCourseForm> = (
    values
  ) => {
    console.log("values", values);
  };

  const onHandleSubmitUpdate: SubmitHandler<IregisterInputCourseForm> = (
    values
  ) => {
    console.log("values update", values);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...courseInfo,
      total: courseInfo?.total?.toString(),
    });
  }, [isSubmitSuccessful, courseInfo]);

  const addUpdateContent = (
    <form
      onSubmit={
        type === modalTypes.ADD
          ? handleSubmit(onHandleSubmitAdd)
          : handleSubmit(onHandleSubmitUpdate)
      }
    >
      <p>Name: </p>
      <TextFieldCommon
        field="name"
        defaultValue={courseInfo?.name || ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Year: </p>
      <SelectReactCommon
        field="year"
        options={yearSemesterOptions}
        defaultValue={
          yearSemesterOptions.find((item) => item.value === courseInfo?.year) ||
          ""
        }
        errors={errors}
        control={control}
      />
      <p className="mt-2">Total: </p>
      <TextFieldCommon
        field="total"
        type={inputTypes.NUMBER}
        defaultValue={courseInfo?.total || ""}
        errors={errors}
        register={register}
      />
      <Button variant="contained" size="small" className="mt-4 w-100" type="submit">
        Save
      </Button>
    </form>
  );

  const deleteContent = (
    <p>
      Are you want to delete this <b>{courseInfo?.name}</b>?
    </p>
  );

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
      nameTitle="course"
    />
  );
};

export default connect()(ModalCoursePage);
