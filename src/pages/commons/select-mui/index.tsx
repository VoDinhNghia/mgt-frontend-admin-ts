import React from "react";
import { MenuItem, Select, FormControl, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import { IpropSelectMuiForm } from "../../../interfaces/common.interface";

const SelectMuiCommon = (props: IpropSelectMuiForm) => {
  const {
    errors,
    field,
    defaultValue,
    options = [],
    control,
    register,
  } = props;

  return (
    <FormControl fullWidth={true} size="small" error={Boolean(errors[field])}>
      <Controller
        render={() => (
          <Select
            size="small"
            fullWidth={true}
            defaultValue={defaultValue}
            error={!!errors[field]}
            {...register(field)}
          >
            {options.map((item: { value: string; label: string }) => {
              return (
                <MenuItem key={item?.value} value={item?.value}>
                  {item?.label}
                </MenuItem>
              );
            })}
          </Select>
        )}
        name="field"
        control={control}
      />
      <FormHelperText>
        {errors[field] ? errors[field].message : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectMuiCommon;
