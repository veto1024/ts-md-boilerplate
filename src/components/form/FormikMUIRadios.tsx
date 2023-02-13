import { ErrorMessage, FieldHookConfig, FieldInputProps, FieldMetaProps, useField } from 'formik';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';

export type FormikMUIRadiosType = {
  defaultValue?: string | number | boolean | undefined;
  inline?: boolean;
  text: string | number | boolean | undefined;
  name: string;
  'aria-label'?: string;
  required?: boolean;
  helperText?: string;
  options: Array<{ label: string; value: any }>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

const FormikMUIRadios = (props: FormikMUIRadiosType & FieldHookConfig<any>) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`

  const [field, meta] = useField({ ...props, type: 'radios' });
  return (
    <>
      <QuestionWithButtons {...props} {...field} {...meta} defaultValue={props.defaultValue ? props.defaultValue : undefined} />
      {meta.touched && meta.error ? (
        <ErrorMessage
          render={(s) => (
            <Typography variant="caption" sx={{ color: 'red' }}>
              {s}
            </Typography>
          )}
          name={props.name}
        />
      ) : null}
    </>
  );
};

export const QuestionWithButtons = (props: FormikMUIRadiosType & FieldInputProps<any> & FieldMetaProps<any>) => {
  return (
    <FormControl
      {...(props.inline
        ? { sx: { flexDirection: 'row', alignItems: 'center', my: 0.5 } }
        : {
            sx: {
              flexDirection: 'column',
              my: 0
            }
          })}
      fullWidth
      error={!!props.error && props.required}
    >
      {props.text ? (
        <Grid item {...(props.inline ? { xs: 9 } : { xs: 12 })}>
          <FormLabel component="legend">{props.text}</FormLabel>
        </Grid>
      ) : (
        ''
      )}
      <Grid item {...(props.inline && props.text ? { xs: 3 } : { xs: 12 })}>
        <RadioGroup
          row
          aria-label={props['aria-label'] || props.name}
          name={`${props.name}`}
          value={props.value}
          onChange={(event) => props.setFieldValue(props.name, str2bool(event.currentTarget.value))}
        >
          {props.options.map((option) => (
            <FormControlLabel
              key={option.value}
              sx={{ width: !props.inline ? '100%' : 'auto' }}
              control={<Radio />}
              value={option.value}
              label={<Typography width="100%">{option.label}</Typography>}
            />
          ))}
        </RadioGroup>
        <FormHelperText>{props.helperText}</FormHelperText>
      </Grid>
    </FormControl>
  );
};

export default FormikMUIRadios;

const str2bool = (value: string) => {
  if (value) {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return value;
};
