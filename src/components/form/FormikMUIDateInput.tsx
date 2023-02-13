import { Field, FieldHookConfig, FieldMetaProps, FieldProps, FormikBag } from 'formik';
import React from 'react';
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

export type FormikMUIDateInputType = {
  label?: string;
  id?: string;
  name: string;
  TextFieldProps?: TextFieldProps;
};

export const FormikMUIDateInput = (props: FormikMUIDateInputType & FieldHookConfig<any>) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)

  return (
    <>
      <Field name={props.name}>
        {({ field, form, meta }: { field: FieldProps['field']; form: FormikBag<any, any>; meta: FieldMetaProps<any> }) => {
          return (
            <>
              <DesktopDatePicker
                label={props.label}
                inputFormat="MM-DD-yyyy"
                mask="__-__-____"
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
