// theme
import ThemeConfig from './theme/globalStyles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  createFilterOptions,
  Grid,
  Typography,
  TypographyVariant
} from '@mui/material';
import React, { FormEvent, useEffect } from 'react';
import { Form, Formik } from 'formik';
import FormikMUIAutoComplete from './components/form/FormikMUIAutoComplete';
import * as Yup from 'yup';
import { FormikMUICheckbox, FormikMUIDateInput } from './components';
import FormikMUIRadios from './components/form/FormikMUIRadios';
import { FormikMUITextInput } from './components';
import FormikMUICurrencyInput from './components/form/FormikCurrencyInput';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import FormikMUIDateTimeInput from './components/form/FormikMUIDateTimeInput';
import FormikMUITimeInput from './components/form/FormikMUITimeInput';
// ----------------------------------------------------------------------

export function App() {
  const typographyExamples = ['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle1', 'subtitle2', 'caption', 'body1', 'body2'] as TypographyVariant[];
  useEffect(() => {
    console.warn('HI');
  });
  return (
    <>
      <ThemeConfig>
        <Container maxWidth="xl">
          <Grid container rowGap={2}>
            <Grid item lg={12}>
              <Card>
                <CardContent>
                  <p>Welcome to React with TypeScript and Material Design!</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader title="Typography" subheader="Here's typography stuff" />
                <CardContent>
                  {typographyExamples.map((val) => (
                    <Typography key={val} variant={val}>
                      {`${val}.The brown cow`}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <FormikCard />
          </Grid>
        </Container>
      </ThemeConfig>
    </>
  );
}

const FormikCard = () => {
  const currencyContainerProps = {
    padding: 2,
    border: 1,
    borderRadius: 1,
    borderColor: 'rgba(145, 158, 171, 0.32)'
  };

  const myHandleSubmit = (
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void,
    formikSubmit: React.FormEventHandler<HTMLFormElement>,
    form: FormEvent<HTMLFormElement>
  ) => {
    setFieldTouched('mui-radios');
    formikSubmit(form);
  };
  return (
    <Formik
      initialValues={{
        'autocomplete-value': { label: 'fifty', year: 50 },
        'mui-checkbox': false,
        'mui-radios': null,
        'mui-date': undefined,
        'mui-datetime': undefined,
        'mui-time': undefined
      }}
      validationSchema={Yup.object().shape({
        'autocomplete-value': Yup.object(),
        'mui-checkbox': Yup.boolean(),
        'mui-radios': Yup.string().required('Please select an option.'),
        'mui-date': Yup.date().min(new Date(), 'The date must be in the future.').required('The date is required.'),
        'mui-datetime': Yup.date().min(new Date(), 'The date must be in the future.').required('The datetime is required.'),
        'mui-time': Yup.date().min(new Date(), 'The date must be in the future.').required('The datetime is required.')
      })}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, handleSubmit, setFieldValue, setFieldTouched }) => (
        <Card style={{ width: '100%', padding: 10 }}>
          <CardHeader title="Forms" subheader="Forms use Formik" />
          <Form onSubmit={(form) => myHandleSubmit(setFieldTouched, handleSubmit, form)}>
            <CardContent>
              <Grid container width="100%">
                <Grid item lg={4}>
                  <Typography variant="h4">AutoComplete</Typography>
                  <FormikMUIAutoComplete
                    options={[
                      { label: 'fifty', year: 50 },
                      { label: 'sixty', year: 60 }
                    ]}
                    name="autocomplete-value"
                    label="Autocomplete"
                    noSuggestAdd
                    filter={createFilterOptions<{ label: string; year: number }>()}
                  />
                  <span>{`Value of autocomplete: ${values['autocomplete-value'].year}`}</span>
                </Grid>
                <Grid item lg={4} padding={2}>
                  <Typography variant="h4">Checkboxes</Typography>
                  <FormikMUICheckbox name="mui-checkbox" label="Am I clicked?" component="span" width="100%" />
                  <span>{`Value of checkbox: ${values['mui-checkbox']}`}</span>
                </Grid>
                <Grid item lg={4} padding={2}>
                  <Typography variant="h4">Radio Group</Typography>
                  <FormikMUIRadios
                    text="Formik MUI Radios"
                    name="mui-radios"
                    options={[
                      { label: 'Option 1', value: 'option 1' },
                      { label: 'Option 2', value: 'option 2' }
                    ]}
                    required
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item lg={4} padding={2}>
                  <Typography variant="h4">Text Field</Typography>
                  <FormikMUITextInput
                    name="mui-textInput-1"
                    TextFieldProps={{
                      fullWidth: true,
                      variant: 'standard',
                      placeholder: 'Standard Variant, No Label',
                      sx: { marginBottom: 3 }
                    }}
                  />
                  <FormikMUITextInput
                    name="mui-textInput-2"
                    label="Static label text field"
                    TextFieldProps={{
                      fullWidth: true,
                      variant: 'standard',
                      placeholder: 'Standard Variant, w/ static label',
                      sx: { marginBottom: 3 }
                    }}
                  />
                  <FormikMUITextInput
                    name="mui-textInput-2"
                    TextFieldProps={{
                      fullWidth: true,
                      variant: 'standard',
                      label: 'Dynamic label',
                      placeholder: 'Standard Variant, w/ dynamic label',
                      sx: { marginBottom: 3 }
                    }}
                  />
                  <FormikMUITextInput
                    name="mui-textInput-3"
                    label="Static label text field"
                    TextFieldProps={{
                      fullWidth: true,
                      variant: 'outlined',
                      placeholder: 'Outlined Variant',
                      label: 'Outlined Variant',
                      sx: { marginBottom: 3 }
                    }}
                  />
                  <FormikMUITextInput
                    name="mui-textInput-3"
                    label="Static label text field"
                    TextFieldProps={{
                      fullWidth: true,
                      variant: 'outlined',
                      placeholder: 'Outlined Variant, w/ static label',
                      sx: { marginBottom: 3 }
                    }}
                  />
                  <FormikMUITextInput
                    name="mui-textInput-3"
                    TextFieldProps={{
                      fullWidth: true,
                      variant: 'outlined',
                      label: 'Dynamic label',
                      placeholder: 'Outlined Variant, w/ static label',
                      sx: { marginBottom: 3 }
                    }}
                  />
                </Grid>
                <Grid item lg={4} padding={2}>
                  <Typography variant="h4">Currency Input</Typography>
                  <FormikMUICurrencyInput
                    clearOnFocus
                    label="Currency Label"
                    name="mui-currency"
                    currencyWidth={12}
                    defaultValue="0.00"
                    placeholder="Placeholder"
                    containerProps={currencyContainerProps}
                  />
                  <FormikMUICurrencyInput
                    clearOnFocus
                    label="Currency Label w/out Placeholder"
                    name="mui-currency-2"
                    currencyWidth={12}
                    defaultValue="0.00"
                    containerProps={currencyContainerProps}
                  />
                  <FormikMUICurrencyInput
                    clearOnFocus
                    label="Currency Label with 6 width"
                    name="mui-currency-3"
                    currencyWidth={6}
                    defaultValue="0.00"
                    containerProps={currencyContainerProps}
                  />
                </Grid>
                <Grid item lg={4} />
                <Grid item lg={4} padding={2}>
                  <Typography variant="h4">Date Picker</Typography>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <FormikMUIDateInput
                      name="mui-date"
                      TextFieldProps={{
                        fullWidth: true,
                        size: 'medium'
                      }}
                    />
                  </LocalizationProvider>
                  <span>{`Value of mui-date: ${values['mui-date']}`}</span>
                </Grid>
                <Grid item lg={4} padding={2}>
                  <Typography variant="h4">Datetime Picker</Typography>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <FormikMUIDateTimeInput
                      name="mui-datetime"
                      TextFieldProps={{
                        fullWidth: true,
                        size: 'medium'
                      }}
                    />
                  </LocalizationProvider>
                  <span>{`Value of mui-datetime: ${values['mui-datetime']}`}</span>
                </Grid>
                <Grid item lg={4} padding={2}>
                  <Typography variant="h4">Time Picker</Typography>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <FormikMUITimeInput
                      name="mui-time"
                      TextFieldProps={{
                        fullWidth: true,
                        size: 'medium'
                      }}
                    />
                  </LocalizationProvider>
                  <span>{`Value of mui-time: ${values['mui-time']}`}</span>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" type="submit" color="info">
                Click me!
              </Button>
            </CardActions>
          </Form>
        </Card>
      )}
    </Formik>
  );
};
