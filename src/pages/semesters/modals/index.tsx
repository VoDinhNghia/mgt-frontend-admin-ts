import React, { useEffect } from "react";
import { IpropModalSemester } from "../../../interfaces/semester.interface";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputSemesterForm,
  registerSchemaSemesterForm,
  yearSemesterOptions,
} from "../../../utils/semester.util";
import { modalTypes } from "../../../constants/constant";

const ModalSemesterPage = (props: IpropModalSemester) => {
  const { isShowModal, type, onCloseModal, semesterInfo = {} } = props;

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
    console.log("values", values);
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputSemesterForm> = (
    values
  ) => {
    console.log("values", values);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset(semesterInfo);
  }, [isSubmitSuccessful, semesterInfo]);

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
              defaultValue={
                type === modalTypes.UPDATE ? semesterInfo?.name : ""
              }
              error={!!errors["name"]}
              helperText={errors["name"] ? errors["name"].message : ""}
              {...register("name")}
            />
            <p className="mt-2">Year: </p>
            <FormControl
              fullWidth={true}
              size="small"
              error={Boolean(errors["year"])}
            >
              <Controller
                render={() => (
                  <Select
                    fullWidth={true}
                    size="small"
                    defaultValue={
                      type === modalTypes.UPDATE ? semesterInfo?.year : ""
                    }
                    error={!!errors["year"]}
                    {...register("year")}
                  >
                    {yearSemesterOptions?.map((item) => {
                      return (
                        <MenuItem
                          key={`${item.value}-semester`}
                          value={item.value}
                        >
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
                name="year"
                control={control}
              />
              <FormHelperText>
                {errors["year"] ? errors["year"].message : ""}
              </FormHelperText>
            </FormControl>
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

export default connect()(ModalSemesterPage);
