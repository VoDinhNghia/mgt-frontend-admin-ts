import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import {
  IeventOnchangeSelect,
  IpropSelectReactForm,
} from "../../../interfaces/common.interface";
import Select from "react-select";

const SelectReactCommon = (props: IpropSelectReactForm) => {
  const { errors, field, defaultValue, control, options = [] } = props;

  return (
    <FormControl fullWidth={true} size="small" error={Boolean(errors[field])}>
      <Controller
        render={({ field: { onChange } }) => (
          <Select
            options={options}
            defaultValue={defaultValue}
            onChange={(val: IeventOnchangeSelect) => onChange(val.value)}
          />
        )}
        name={field}
        control={control}
      />
      <FormHelperText>
        {errors[field] ? errors[field].message : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectReactCommon;
