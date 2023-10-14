import React from "react";
import { TextField } from "@mui/material";
import { IpropTextFieldInput } from "../../../interfaces/common.interface";

const TextFieldCommon = (props: IpropTextFieldInput) => {
  const { errors, register, field, defaultValue } = props;

  return (
    <TextField
      fullWidth={true}
      size="small"
      type="text"
      defaultValue={defaultValue}
      error={!!errors[field]}
      helperText={errors[field] ? errors[field].message : ""}
      {...register(field)}
    />
  );
};

export default TextFieldCommon;
