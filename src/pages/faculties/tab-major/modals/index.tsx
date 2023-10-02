import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  TextField,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { IpropModalMajor } from "../../../../interfaces/faculty.interface";
import {
  formatDate,
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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";

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
    console.log("values", values);
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
  }, [isSubmitSuccessful]);

  return (
    <Dialog
      open={isShowModal}
      fullWidth={true}
      maxWidth="xs"
      onClose={() => onCloseModal()}
    >
      <DialogTitle>
        {type === modalTypes.ADD ? "Add new major" : ""}
        {type === modalTypes.UPDATE ? "Update major" : ""}
        {type === modalTypes.DELETE ? "Delete major" : ""}
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
              defaultValue={type === modalTypes.UPDATE ? majorInfo?.name : ""}
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
                  ? moment(majorInfo?.foundYear).format(formatDate)
                  : ""
              }
              error={!!errors["foundYear"]}
              helperText={
                errors["foundYear"] ? errors["foundYear"].message : ""
              }
              {...register("foundYear")}
            />
            <p className="mt-2">Faculty: </p>
            <FormControl
              fullWidth={true}
              size="small"
              error={Boolean(errors["faculty"])}
            >
              <Controller
                render={() => (
                  <Select
                    fullWidth={true}
                    size="small"
                    defaultValue={
                      type === modalTypes.UPDATE ? majorInfo?.faculty?._id : ""
                    }
                    error={!!errors["faculty"]}
                    {...register("faculty")}
                  >
                    {facultyOptions?.map((item) => {
                      return (
                        <MenuItem
                          key={`${item.value}-faculty`}
                          value={item.value}
                        >
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
                name="faculty"
                control={control}
              />
              <FormHelperText>
                {errors["faculty"] ? errors["faculty"].message : ""}
              </FormHelperText>
            </FormControl>
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
                        ? majorInfo?.headOfSection?._id
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
                        ? majorInfo?.eputeHead?._id
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
                type === modalTypes.UPDATE ? majorInfo?.introduction : ""
              }
              error={!!errors["introduction"]}
              helperText={
                errors["introduction"] ? errors["introduction"].message : ""
              }
              {...register("introduction")}
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
            Are you want to delete this major <b>{majorInfo?.name}</b>
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
    listFaculties: state.FacultyReducer.listFaculties,
  };
};

export default connect(mapStateToProps)(MajorModalPage);
