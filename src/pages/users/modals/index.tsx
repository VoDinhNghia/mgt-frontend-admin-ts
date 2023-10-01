import React, { useEffect, useState } from "react";
import { IpropUserMgtModal } from "../../../interfaces/user.interface";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  modalTypes,
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
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              error={!!errors["email"]}
              helperText={errors["email"] ? errors["email"].message : ""}
              {...register("email")}
            />
            <p className="mt-2">Password</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              type="password"
              error={!!errors["passWord"]}
              helperText={errors["passWord"] ? errors["passWord"].message : ""}
              {...register("passWord")}
            />
            <p className="mt-2">Role</p>
            <Select
              size="small"
              fullWidth={true}
              variant="outlined"
              error={!!errors["role"]}
              {...register("role")}
            >
              {userRoleOptions.map((role, index) => {
                return (
                  <MenuItem value={role.value} key={`${index}-${role.value}`}>
                    {role.value}
                  </MenuItem>
                );
              })}
            </Select>
            <p className="mt-2">FirstName</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              error={!!errors["firstName"]}
              helperText={
                errors["firstName"] ? errors["firstName"].message : ""
              }
              {...register("firstName")}
            />
            <p className="mt-2">LastName</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              error={!!errors["lastName"]}
              helperText={errors["lastName"] ? errors["lastName"].message : ""}
              {...register("lastName")}
            />
            <p className="mt-2">MiddleName</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              error={!!errors["middleName"]}
              helperText={
                errors["middleName"] ? errors["middleName"].message : ""
              }
              {...register("middleName")}
            />
            <p className="mt-2">Mobile</p>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              error={!!errors["mobile"]}
              helperText={errors["mobile"] ? errors["mobile"].message : ""}
              {...register("mobile")}
            />
            <p className="mt-2">Gender</p>
            <Select
              size="small"
              fullWidth={true}
              variant="outlined"
              error={!!errors["gender"]}
              {...register("gender")}
            >
              {userGenderOptions.map((gender, index) => {
                return (
                  <MenuItem
                    value={gender.value}
                    key={`${index}-${gender.value}`}
                  >
                    {gender.value}
                  </MenuItem>
                );
              })}
            </Select>
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
            <Select
              variant="outlined"
              size="small"
              fullWidth={true}
              defaultValue={userInfo?.role}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, role: e.target.value })
              }
            >
              {userRoleOptions.map((role, index) => {
                return (
                  <MenuItem value={role.value} key={`${index}-${role.value}`}>
                    {role.value}
                  </MenuItem>
                );
              })}
            </Select>
            <p className="mt-2">Status: </p>
            <Select
              variant="outlined"
              size="small"
              fullWidth={true}
              defaultValue={userInfo.status}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, status: e.target.value })
              }
            >
              {userStatusOptions.map((status, index) => {
                return (
                  <MenuItem
                    key={`${index}-${status.value}`}
                    value={status.value}
                  >
                    {status.value}
                  </MenuItem>
                );
              })}
            </Select>
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
          <Button variant="outlined" size="small" onClick={() => updateUser()}>
            Save
          </Button>
        ) : null}
        {type === modalTypes.DELETE ? (
          <Button
            variant="outlined"
            size="small"
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
