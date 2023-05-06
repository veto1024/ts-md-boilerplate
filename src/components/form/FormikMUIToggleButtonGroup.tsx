import { ErrorMessage, FieldHookConfig, FieldInputProps, FieldMetaProps, useField } from 'formik';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export type FormikMUIToggleButtonType = {
  defaultValue?: string | number | boolean | undefined;
  inline?: boolean;
  text: string | number | boolean | undefined;
  name: string;
  'aria-label'?: string;
  required?: boolean;
  helperText?: string;
  options: Array<{ label?: string; value: any; tooltip?: ReactNode }>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const FormikMUIToggleButtons = (props: FormikMUIToggleButtonType & FieldHookConfig<any>) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`

  const [field, meta] = useField({ ...props, type: 'radios' });
  return (
    <>
      <QuestionAsToggleButtons {...props} {...field} {...meta} defaultValue={props.defaultValue ? props.defaultValue : undefined} />
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

export const QuestionAsToggleButtons = (props: FormikMUIToggleButtonType & FieldInputProps<any> & FieldMetaProps<any>) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9'
      }
    })
  );

  return (
    <FormControl fullWidth error={!!props.error && props.required}>
      {props.text ? (
        <Grid item {...(props.inline ? { xs: 9 } : { xs: 12 })}>
          <FormLabel component="legend">{props.text}</FormLabel>
        </Grid>
      ) : (
        ''
      )}
      <ToggleButtonGroup
        orientation="vertical"
        aria-label={props['aria-label'] || props.name}
        fullWidth
        exclusive
        size="large"
        onChange={(event, nextView) => props.setFieldValue(props.name, nextView)}
      >
        {props.options.map((option) => (
          <ToggleButton selected={option.value === props.value} key={option.value} value={option.value} sx={{ width: '100%' }}>
            {option.tooltip ? (
              <HtmlTooltip title={option.tooltip}>
                <p>{option.label}</p>
              </HtmlTooltip>
            ) : (
              option.label
            )}
          </ToggleButton>
        ))}
        <Typography>{`Current value: ${props.value}`}</Typography>
      </ToggleButtonGroup>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};
