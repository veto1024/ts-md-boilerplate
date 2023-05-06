import React from 'react';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import { Field, FieldMetaProps, FieldProps, FormikBag } from 'formik';

export type FormikMUISelectType = {
  options: any;
  name: string;
  label: string;
};

export const FormikMUISelect = ({ options, name, ...other }: FormikMUISelectType) => {
  return (
    <>
      <Field name={name}>
        {({ field, form, meta }: { field: FieldProps['field']; form: FormikBag<any, any>; meta: FieldMetaProps<any> }) => {
          return (
            <>
              <Select
                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                id={`${name}-autocomplete-box`}
                sx={{ width: '100%' }}
                value={field.value}
                {...other}
              >
                {Object.keys(options).map((key) => (
                  <MenuItem key={key} value={key}>
                    {options[key]}
                  </MenuItem>
                ))}
              </Select>
              {meta.error ? <FormHelperText error>{meta.error}</FormHelperText> : ''}
            </>
          );
        }}
      </Field>
    </>
  );
};
