import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { IpropModalFaculty } from "../../../../interfaces/faculty.interface";
import {
  formatDate,
  inputTypes,
  modalTypes,
  userRoles,
} from "../../../../constants/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputFacultyForm,
  handleUserOptions,
  registerSchemaFacultyForm,
} from "../../../../utils/faculty.util";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { facultyActions, userActions } from "../../../../store/actions";
import moment from "moment";
import ModalCommonPage from "../../../commons/modal-common";
import TextFieldCommon from "../../../commons/textfield-input";
import SelectMuiCommon from "../../../commons/select-mui";

const ModalFacultyPage = (props: IpropModalFaculty) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    listUsers = [],
    dispatch,
    facultyInfo,
    fetchFaculties,
  } = props;

  const fetchUsers = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        role: userRoles.LECTURER,
      },
    });
  };

  const userOptions = handleUserOptions(listUsers);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputFacultyForm>({
    resolver: zodResolver(registerSchemaFacultyForm),
  });

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputFacultyForm> = (
    values
  ) => {
    const { name, foundYear, headOfSection, eputeHead, introduction } = values;
    dispatch({
      type: facultyActions.ADD_FACULTY,
      id: facultyInfo?._id,
      payload: {
        name,
        foundYear,
        headOfSection,
        eputeHead,
        introduction,
      },
    });
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputFacultyForm> = (
    values
  ) => {
    const { name, foundYear, headOfSection, eputeHead, introduction } = values;
    dispatch({
      type: facultyActions.UPDATE_FACULTY,
      id: facultyInfo?._id,
      payload: {
        name,
        foundYear,
        headOfSection,
        eputeHead,
        introduction,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: facultyActions.DELETE_FACULTY,
      id: facultyInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchFaculties();
      onCloseModal();
    }, 70);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    fetchUsers();
    reset({
      ...facultyInfo,
      foundYear: facultyInfo?.foundYear
        ? moment(facultyInfo?.foundYear).format(formatDate)
        : "",
      headOfSection: facultyInfo?.headOfSection?._id,
      eputeHead: facultyInfo?.eputeHead?._id,
    });
  }, [isSubmitSuccessful, facultyInfo]);

  const deleteContent = (
    <p>
      Are you want to delete this faculty <b>{facultyInfo?.name}</b>?
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
        defaultValue={facultyInfo?.name || ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Found year:</p>
      <TextFieldCommon
        field="foundYear"
        type={inputTypes.DATE}
        defaultValue={
          type === modalTypes.UPDATE
            ? moment(facultyInfo?.foundYear).format(formatDate)
            : ""
        }
        errors={errors}
        register={register}
      />
      <p className="mt-2">HeadOfSection: </p>
      <SelectMuiCommon
        field="headOfSection"
        options={userOptions}
        errors={errors}
        register={register}
        defaultValue={facultyInfo?.headOfSection?._id || ""}
        control={control}
      />
      <p className="mt-2">eputeHead: </p>
      <SelectMuiCommon
        field="eputeHead"
        options={userOptions}
        errors={errors}
        register={register}
        defaultValue={facultyInfo?.eputeHead?._id || ""}
        control={control}
      />
      <p className="mt-2">Introduction: </p>
      <TextFieldCommon
        field="introduction"
        type={inputTypes.TEXT_AREA}
        defaultValue={facultyInfo?.introduction || ""}
        errors={errors}
        register={register}
      />
      <Button variant="contained" className="mt-4 w-100" type="submit">
        Save
      </Button>
    </form>
  );

  return (
    <ModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      nameTitle="faculty"
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
      onDelete={() => onDelete()}
    />
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listUsers: state.UserReducer.listUsers,
  };
};

export default connect(mapStateToProps)(ModalFacultyPage);
