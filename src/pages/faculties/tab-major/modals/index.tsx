import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { IpropModalMajor } from "../../../../interfaces/faculty.interface";
import {
  formatDate,
  inputTypes,
  modalTypes,
  userRoles,
} from "../../../../constants/constant";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { facultyActions, userActions } from "../../../../store/actions";
import {
  IregisterInputMajorForm,
  handleFacultyOptions,
  handleUserOptions,
  registerSchemaMajorForm,
} from "../../../../utils/faculty.util";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import TextFieldCommon from "../../../commons/textfield-input";
import SelectMuiCommon from "../../../commons/select-mui";

const MajorModalPage = (props: IpropModalMajor) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    majorInfo,
    listFaculties = [],
    listUsers = [],
    dispatch,
    fetchMajors,
  } = props;

  const fetchUsers = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        role: userRoles.LECTURER,
      },
    });
  };

  const fetchFaculties = () => {
    dispatch({
      type: facultyActions.GET_LIST_FACULTY,
    });
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputMajorForm>({
    resolver: zodResolver(registerSchemaMajorForm),
  });

  const userOptions = handleUserOptions(listUsers);
  const facultyOptions = handleFacultyOptions(listFaculties);

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputMajorForm> = (
    values
  ) => {
    const { name, headOfSection, eputeHead, faculty, introduction, foundYear } =
      values;
    dispatch({
      type: facultyActions.ADD_MAJOR,
      payload: {
        name,
        headOfSection,
        eputeHead,
        introduction,
        faculty,
        foundYear,
      },
    });
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputMajorForm> = (
    values
  ) => {
    const { name, headOfSection, eputeHead, faculty, introduction, foundYear } =
      values;
    dispatch({
      type: facultyActions.UPDATE_MAJOR,
      id: majorInfo?._id,
      payload: {
        name,
        headOfSection,
        eputeHead,
        introduction,
        faculty,
        foundYear,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: facultyActions.DELETE_MAJOR,
      id: majorInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchMajors();
      onCloseModal();
    }, 70);
  };

  useEffect(() => {
    fetchUsers();
    fetchFaculties();
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...majorInfo,
      foundYear: majorInfo?.foundYear
        ? moment(majorInfo?.foundYear).format(formatDate)
        : "",
      faculty: majorInfo?.faculty?._id,
      headOfSection: majorInfo?.headOfSection?._id,
      eputeHead: majorInfo?.eputeHead?._id,
    });
  }, [isSubmitSuccessful, majorInfo]);

  const deleteContent = (
    <p>
      Are you want to delete this major <b>{majorInfo?.name}</b>
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
        defaultValue={majorInfo?.name || ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Found year:</p>
      <TextFieldCommon
        field="foundYear"
        type={inputTypes.DATE}
        defaultValue={moment(majorInfo?.foundYear).format(formatDate) || ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Faculty: </p>
      <SelectMuiCommon
        field="faculty"
        options={facultyOptions}
        register={register}
        errors={errors}
        control={control}
      />
      <p className="mt-2">HeadOfSection: </p>
      <SelectMuiCommon
        field="headOfSection"
        options={userOptions}
        register={register}
        errors={errors}
        control={control}
      />
      <p className="mt-2">eputeHead: </p>
      <SelectMuiCommon
        field="eputeHead"
        options={userOptions}
        register={register}
        errors={errors}
        control={control}
      />
      <p className="mt-2">Introduction: </p>
      <TextFieldCommon
        field="introduction"
        type={inputTypes.TEXT_AREA}
        defaultValue={majorInfo?.introduction || ""}
        errors={errors}
        register={register}
      />
      <Button type="submit" variant="contained" className="mt-4 w-100">
        Save
      </Button>
    </form>
  );

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      nameTitle="major"
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
      onDelete={() => onDelete()}
    />
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listUsers: state.UserReducer.listUsers,
    listFaculties: state.FacultyReducer.listFaculties,
  };
};

export default connect(mapStateToProps)(MajorModalPage);
