import React, { useEffect, useState } from "react";
import { IpropUserMgtModal } from "../../../interfaces/user.interface";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import {
  inputTypes,
  modalTypes,
  selectMuiTypes,
  userGenderOptions,
  userRoleOptions,
  userStatusOptions,
} from "../../../constants/constant";
import { connect } from "react-redux";
import { userActions } from "../../../store/actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputUserAddForm,
  registerSchemaUserAddForm,
} from "../../../utils/user.util";
import { IeventOnchangeInput } from "../../../interfaces/common.interface";
import TextFieldCommon from "../../commons/textfield-input";
import SelectMuiCommon from "../../commons/select-mui";

const ModalUserMgtPage = (props: IpropUserMgtModal) => {
  const { isShowModal, onCloseModal, type, dispatch, fetchUsers, userInfo } =
    props;

  const [state, setState] = useState({
    email: userInfo?.email,
    role: userInfo?.role,
    status: userInfo?.status,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputUserAddForm>({
    resolver: zodResolver(registerSchemaUserAddForm),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputUserAddForm> = (
    values
  ) => {
    const {
      email,
      passWord,
      middleName,
      lastName,
      firstName,
      role,
      mobile,
      gender,
    } = values;
    dispatch({
      type: userActions.ADD_USER,
      payload: {
        email,
        passWord,
        middleName,
        lastName,
        firstName,
        role,
        mobile,
        gender,
      },
    });
    fetchAndCloseModal();
  };

  const updateUser = () => {
    const { email, status, role } = state;
    dispatch({
      type: userActions.UPDATE_USER_INFO,
      id: userInfo?._id,
      payload: {
        email,
        status,
        role,
      },
    });
    fetchAndCloseModal();
  };

  const deleteUser = () => {
    dispatch({
      type: userActions.DELETE_USER,
      id: userInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchUsers();
      onCloseModal();
    }, 100);
  };

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new user" : null}
        {type === modalTypes.UPDATE ? "Update user info" : null}
        {type === modalTypes.DELETE ? "Delete user" : null}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.ADD ? (
          <form onSubmit={handleSubmit(onSubmitHandlerAdd)}>
            <p>Email</p>
            <TextFieldCommon
              field="email"
              type={inputTypes.EMAIL}
              errors={errors}
              register={register}
            />
            <p className="mt-2">Password</p>
            <TextFieldCommon
              field="passWord"
              type={inputTypes.PASSWORD}
              errors={errors}
              register={register}
            />
            <p className="mt-2">Role</p>
            <SelectMuiCommon
              field="role"
              options={userRoleOptions}
              errors={errors}
              register={register}
              control={control}
            />
            <p className="mt-2">FirstName</p>
            <TextFieldCommon
              field="firstName"
              errors={errors}
              register={register}
            />
            <p className="mt-2">LastName</p>
            <TextFieldCommon
              field="lastName"
              errors={errors}
              register={register}
            />
            <p className="mt-2">MiddleName</p>
            <TextFieldCommon
              field="middleName"
              errors={errors}
              register={register}
            />
            <p className="mt-2">Mobile</p>
            <TextFieldCommon
              field="mobile"
              errors={errors}
              register={register}
            />
            <p className="mt-2">Gender</p>
            <SelectMuiCommon
              field="gender"
              options={userGenderOptions}
              errors={errors}
              register={register}
              control={control}
            />
            <Button type="submit" variant="contained" className="mt-4 w-100">
              Save
            </Button>
          </form>
        ) : null}
        {type === modalTypes.UPDATE ? (
          <>
            <p>Email: </p>
            <TextField
              variant="outlined"
              size="small"
              fullWidth={true}
              defaultValue={userInfo?.email}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, email: e.target.value })
              }
            />
            <p className="mt-2">Role: </p>
            <SelectMuiCommon
              type={selectMuiTypes.NORMAL}
              options={userRoleOptions}
              defaultValue={userInfo?.role}
              onChangeSelect={(value: string) => setState({ ...state, role: value })}
            />
            <p className="mt-2">Status: </p>
            <SelectMuiCommon
              type={selectMuiTypes.NORMAL}
              options={userStatusOptions}
              defaultValue={userInfo?.status}
              onChangeSelect={(value: string) => setState({ ...state, role: value })}
            />
          </>
        ) : null}
        {type === modalTypes.DELETE ? (
          <span>
            Are you want to delete user{" "}
            <b>
              {userInfo?.name}-{userInfo?.code}
            </b>
            ?
          </span>
        ) : null}
      </DialogContent>
      <DialogActions>
        {type === modalTypes.UPDATE ? (
          <Button
            variant="contained"
            className="w-100"
            onClick={() => updateUser()}
          >
            Save
          </Button>
        ) : null}
        {type === modalTypes.DELETE ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteUser()}
          >
            Yes
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default connect()(ModalUserMgtPage);
