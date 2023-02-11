import { FieldHookConfig, useField } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

export type MyFormikCheckboxType = {
  label: string;
  setFieldValue: any;
  labelPlacement?: "end" | "start" | "top" | "bottom" | undefined;
};
export const MyFormikCheckbox = (
  props: MyFormikCheckboxType & FieldHookConfig<boolean>
) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <>
      <FormControlLabel
        labelPlacement={props.labelPlacement ? props.labelPlacement : "end"}
        defaultChecked={props.defaultChecked}
        control={<Checkbox />}
        label={props.label}
        {...field}
      />
    </>
  );
};
