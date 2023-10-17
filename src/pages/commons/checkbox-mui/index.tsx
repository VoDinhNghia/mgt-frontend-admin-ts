import React from "react";
import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";
import { IpropCheckBoxMui } from "../../../interfaces/common.interface";

const CheckBoxMuiCommon = (props: IpropCheckBoxMui) => {
  const { label, defaultValue = "", field, control } = props;

  return (
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
  );
};

export default CheckBoxMuiCommon;
