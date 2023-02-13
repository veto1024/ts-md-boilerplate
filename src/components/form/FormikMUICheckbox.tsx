import { FieldHookConfig, useField } from 'formik';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

type FormikMUICheckboxType = {
  label: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom' | undefined;
};

export const FormikMUICheckbox = (props: FormikMUICheckboxType & FieldHookConfig<boolean>) => {
  const [field] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <FormControlLabel
        labelPlacement={props.labelPlacement ? props.labelPlacement : 'end'}
        defaultChecked={props.defaultChecked}
        control={<Checkbox />}
        label={props.label}
        {...field}
      />
    </>
  );
};
