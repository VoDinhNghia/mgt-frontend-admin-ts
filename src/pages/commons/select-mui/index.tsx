import React from "react";
import { MenuItem, Select, FormControl, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import {
  IeventOnchangeSelect,
  IpropSelectMuiForm,
} from "../../../interfaces/common.interface";
import { selectMuiTypes } from "../../../constants/constant";

const SelectMuiCommon = (props: IpropSelectMuiForm) => {
  const {
    errors,
    field = "",
    defaultValue = "",
    options = [],
    control,
    register,
    type = selectMuiTypes.USE_FORM,
    onChangeSelect,
  } = props;

  return (
    <>
      {type === selectMuiTypes.USE_FORM ? (
        <FormControl
          fullWidth={true}
          size="small"
          error={Boolean(errors[field])}
        >
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
      ) : null}
      {type === selectMuiTypes.NORMAL ? (
        <Select
          variant="outlined"
          size="small"
          fullWidth={true}
          defaultValue={defaultValue}
          onChange={(e: IeventOnchangeSelect) => onChangeSelect(e.target.value)}
        >
          {options.map(
            (item: { value: string; label: string }, index: number) => {
              return (
                <MenuItem value={item.value} key={`${index}-${item.value}`}>
                  {item.value}
                </MenuItem>
              );
            }
          )}
        </Select>
      ) : null}
    </>
  );
};

export default SelectMuiCommon;
