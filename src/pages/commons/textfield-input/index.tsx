import React from "react";
import { TextField } from "@mui/material";
import { IpropTextFieldForm } from "../../../interfaces/common.interface";
import { inputTypes } from "../../../constants/constant";

const TextFieldCommon = (props: IpropTextFieldForm) => {
  const { errors, register, field, defaultValue, type, rows = 4 } = props;

  return (
    <TextField
      fullWidth={true}
      size="small"
      type={type}
      rows={type === inputTypes.TEXT_AREA ? rows : null}
      multiline={type === inputTypes.TEXT_AREA ? true : false}
      defaultValue={defaultValue}
      error={!!errors[field]}
      helperText={errors[field] ? errors[field].message : ""}
      {...register(field)}
    />
  );
};

export default TextFieldCommon;
