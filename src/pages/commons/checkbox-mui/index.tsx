import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { IpropCheckBoxMui } from "../../../interfaces/common.interface";

const CheckBoxMuiCommon = (props: IpropCheckBoxMui) => {
  const { label, defaultValue = "", field, control, errors } = props;

  return (
    <FormControl fullWidth={true} size="small" error={Boolean(errors[field])}>
      <FormControlLabel
        control={
          <Controller
            name={field}
            control={control}
            defaultValue={defaultValue}
            render={({ field: props }) => (
              <Checkbox
                {...props}
                checked={props.value}
                onChange={(e) => props.onChange(e.target.checked)}
              />
            )}
          />
        }
        label={label}
      />
      <FormHelperText>
        {errors[field] ? errors[field].message : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default CheckBoxMuiCommon;
