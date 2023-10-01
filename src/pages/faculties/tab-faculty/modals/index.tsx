import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { connect } from "react-redux";
import { IpropModalFaculty } from "../../../../interfaces/faculty.interface";
import {
  formatDateTextField,
  modalTypes,
  userRoles,
} from "../../../../constants/constant";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputFacultyForm,
  registerSchemaFacultyForm,
} from "../../../../utils/faculty.util";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { userActions } from "../../../../store/actions";
import { IuserInfo } from "../../../../interfaces/login.interface";
import moment from "moment";

const ModalFacultyPage = (props: IpropModalFaculty) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    listUsers = [],
    dispatch,
    facultyInfo,
  } = props;

  const fetchUsers = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        role: userRoles.LECTURER,
      },
    });
  };

  const userOptions = listUsers?.map((user: IuserInfo) => {
    const label = `${user?.profile?.lastName} ${user?.profile?.middleName} ${user?.profile?.lastName}`;
    return {
      value: user?.profile?._id,
      label,
    };
  });

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
    console.log("values", values);
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputFacultyForm> = (
    values
  ) => {
    console.log("values", values);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    fetchUsers();
  }, [isSubmitSuccessful]);

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new faculty" : ""}
        {type === modalTypes.DELETE ? "Delete faculty" : ""}
        {type === modalTypes.UPDATE ? "Update faculty" : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
              fullWidth={true}
              size="small"
              type="text"
              defaultValue={type === modalTypes.UPDATE ? facultyInfo?.name : ""}
              error={!!errors["name"]}
              helperText={errors["name"] ? errors["name"].message : ""}
              {...register("name")}
            />
            <p className="mt-2">Found year:</p>
            <TextField
              fullWidth={true}
              size="small"
              type="date"
              defaultValue={
                type === modalTypes.UPDATE
                  ? moment(facultyInfo?.foundYear).format(formatDateTextField)
                  : ""
              }
              error={!!errors["foundYear"]}
              helperText={
                errors["foundYear"] ? errors["foundYear"].message : ""
              }
              {...register("foundYear")}
            />
            <p className="mt-2">HeadOfSection: </p>
            <FormControl
              fullWidth={true}
              size="small"
              error={Boolean(errors["headOfSection"])}
            >
              <Controller
                render={() => (
                  <Select
                    fullWidth={true}
                    size="small"
                    defaultValue={
                      type === modalTypes.UPDATE
                        ? facultyInfo?.headOfSection?._id
                        : ""
                    }
                    error={!!errors["headOfSection"]}
                    {...register("headOfSection")}
                  >
                    {userOptions?.map(
                      (item: { value: string; label: string }) => {
                        return (
                          <MenuItem
                            key={`${item.value}-headofSection`}
                            value={item.value}
                          >
                            {item.label}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                )}
                name="headOfSection"
                control={control}
              />
              <FormHelperText>
                {errors["headOfSection"] ? errors["headOfSection"].message : ""}
              </FormHelperText>
            </FormControl>
            <p className="mt-2">eputeHead: </p>
            <FormControl
              fullWidth={true}
              size="small"
              error={Boolean(errors["eputeHead"])}
            >
              <Controller
                render={() => (
                  <Select
                    fullWidth={true}
                    size="small"
                    defaultValue={
                      type === modalTypes.UPDATE
                        ? facultyInfo?.eputeHead?._id
                        : ""
                    }
                    error={!!errors["eputeHead"]}
                    {...register("eputeHead")}
                  >
                    {userOptions?.map(
                      (
                        item: { value: string; label: string },
                        index: number
                      ) => {
                        return (
                          <MenuItem
                            key={`${item.value}-${index}`}
                            value={item.value}
                          >
                            {item.label}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                )}
                name="eputeHead"
                control={control}
              />
              <FormHelperText>
                {errors["eputeHead"] ? errors["eputeHead"].message : ""}
              </FormHelperText>
            </FormControl>
            <p className="mt-2">Introduction: </p>
            <TextField
              fullWidth={true}
              size="small"
              type="textarea"
              multiline={true}
              rows={4}
              defaultValue={
                type === modalTypes.UPDATE ? facultyInfo?.introduction : ""
              }
              error={!!errors["introduction"]}
              helperText={
                errors["introduction"] ? errors["introduction"].message : ""
              }
              {...register("introduction")}
            />
            <Button variant="contained" className="mt-4 w-100" type="submit">
              Save
            </Button>
          </form>
        ) : (
          ""
        )}
        {type === modalTypes.DELETE ? (
          <p>
            Are you want to delete this faculty <b>{facultyInfo?.name}</b>?
          </p>
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
    listUsers: state.UserReducer.listUsers,
  };
};

export default connect(mapStateToProps)(ModalFacultyPage);
