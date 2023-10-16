import React, { useEffect } from "react";
import { IpropsModalClassPage } from "../../../../interfaces/class-subject.interface";
import { connect } from "react-redux";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { Button } from "@mui/material";
import { inputTypes, modalTypes } from "../../../../constants/constant";
import TextFieldCommon from "../../../commons/textfield-input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputClassForm,
  registerSchemaClassForm,
} from "../../../../utils/class-subject.util";
import SelectReactCommon from "../../../commons/select-react";
import { classSubjectActions } from "../../../../store/actions";

const ModalClassPage = (props: IpropsModalClassPage) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    classInfo = {},
    userOptions = [],
    majorOptions = [],
    degreeLevelOptions = [],
    courseOptions = [],
    dispatch,
    fetchClasses,
  } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputClassForm>({
    resolver: zodResolver(registerSchemaClassForm),
  });

  const handleAdd: SubmitHandler<IregisterInputClassForm> = (values) => {
    const { name, course, major, homeroomteacher, degreeLevel, classSize } =
      values;
    dispatch({
      type: classSubjectActions.ADD_CLASS,
      payload: {
        name,
        course,
        major,
        homeroomteacher,
        degreeLevel,
        classSize,
      },
    });
    fetchAndCloseModal();
  };

  const handleUpdate: SubmitHandler<IregisterInputClassForm> = (values) => {
    const { name, course, major, homeroomteacher, degreeLevel, classSize } =
      values;
    dispatch({
      type: classSubjectActions.UPDATE_CLASS,
      id: classInfo?._id,
      payload: {
        name,
        course,
        major,
        homeroomteacher,
        degreeLevel,
        classSize,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: classSubjectActions.DELETE_CLASS,
      id: classInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchClasses();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...classInfo,
      major: classInfo?.major?._id,
      course: classInfo?.course?._id,
      degreeLevel: classInfo?.degreeLevel?._id,
      homeroomteacher: classInfo?.homeroomteacher?._id,
      classSize: classInfo?.classSize?.toString(),
    });
  }, [isSubmitSuccessful, classInfo]);

  const deleteContent = (
    <p>
      Are you want to delete this <b>{classInfo?.name}</b>?
    </p>
  );
  const addUpdateContent = (
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
        defaultValue={classInfo?.name || ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Course: </p>
      <SelectReactCommon
        options={courseOptions}
        field="course"
        errors={errors}
        control={control}
        defaultValue={
          courseOptions?.find(
            (course) => course?.value === classInfo?.course?._id
          ) || ""
        }
      />
      <p className="mt-2">Major: </p>
      <SelectReactCommon
        options={majorOptions}
        field="major"
        errors={errors}
        control={control}
        defaultValue={
          majorOptions?.find((item) => item?.value === classInfo?.major?._id) ||
          ""
        }
      />
      <p className="mt-2">DegreeLevel: </p>
      <SelectReactCommon
        options={degreeLevelOptions}
        field="degreeLevel"
        errors={errors}
        control={control}
        defaultValue={
          degreeLevelOptions?.find(
            (item) => item?.value === classInfo?.degreeLevel?._id
          ) || ""
        }
      />
      <p className="mt-2">Home room teacher: </p>
      <SelectReactCommon
        options={userOptions}
        field="homeroomteacher"
        errors={errors}
        control={control}
        defaultValue={
          userOptions?.find(
            (item) => item?.value === classInfo?.homeroomteacher?._id
          ) || ""
        }
      />
      <p className="mt-2">Class size:</p>
      <TextFieldCommon
        field="classSize"
        type={inputTypes.NUMBER}
        defaultValue={classInfo?.classSize || ""}
        errors={errors}
        register={register}
      />
      <Button
        variant="contained"
        size="small"
        className="w-100 mt-3"
        type="submit"
      >
        Save
      </Button>
    </form>
  );

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      nameTitle="class"
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
    />
  );
};

export default connect()(ModalClassPage);
