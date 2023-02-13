import { Field, FieldHookConfig, FieldMetaProps, FieldProps, FormikBag } from 'formik';
import React from 'react';
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { DesktopDateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';

export type FormikMUIDateTimeInputType = {
  name: string;
  label?: string;
  id?: string;
  TextFieldProps?: TextFieldProps;
};

const FormikMUIDateTimeInput = (props: FormikMUIDateTimeInputType & FieldHookConfig<any>) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)

  return (
    <>
      <Field name={props.name}>
        {({ field, form, meta }: { field: FieldProps['field']; form: FormikBag<any, any>; meta: FieldMetaProps<any> }) => {
          return (
            <>
              <DesktopDateTimePicker
                label={props.label}
                onChange={(newValue: string | null) => {
                  form.setFieldValue(props.name, newValue);
                }}
                value={field.value ? field.value : meta.initialValue}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                  <TextField name={props.name} size="small" {...params} {...props.TextFieldProps} error={!!(meta.touched && meta.error)} />
                )}
              />
              {meta.error ? <FormHelperText error>{meta.error}</FormHelperText> : ''}
            </>
          );
        }}
      </Field>
    </>
  );
};

export const FormikMUIMobileDateTimeInput = (props: FormikMUIDateTimeInputType & FieldHookConfig<any>) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)

  return (
    <>
      <Field name={props.name}>
        {({ field, form, meta }: { field: FieldProps['field']; form: FormikBag<any, any>; meta: FieldMetaProps<any> }) => {
          return (
            <>
              <MobileDateTimePicker
                label={props.label}
                onChange={(newValue: string | null) => {
                  form.setFieldValue(props.name, newValue);
                }}
                value={field.value ? field.value : meta.initialValue}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                  <TextField name={props.name} size="small" {...params} error={!!(meta.touched && meta.error)} />
                )}
              />
              {meta.error ? <FormHelperText error>{meta.error}</FormHelperText> : ''}
            </>
          );
        }}
      </Field>
    </>
  );
};

export default FormikMUIDateTimeInput;
