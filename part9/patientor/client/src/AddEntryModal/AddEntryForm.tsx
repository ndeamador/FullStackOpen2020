import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, FormikErrors } from "formik";

import {
  TextField,
  SelectField,
  formTypeOption,
  DiagnosisSelection,
} from "./FormField";
import { NewEntry, TypeOfEntry, AllEntryFieldsType } from "../types";
import TypeFields from "./TypeFields";

import { useStateValue } from "../state";

export type EntryFormValues = NewEntry;

interface Props {
  // onSubmit: (values: NewEntry) => void;
  onSubmit: (values: AllEntryFieldsType) => void;

  onCancel: () => void;
  // initialValues: NewEntry;
}

const formTypeOptions: formTypeOption[] = [
  { value: TypeOfEntry.Hospital, label: "Hospital" },
  {
    value: TypeOfEntry.OccupationalHealthcare,
    label: "Occupational Healthcare",
  },
  { value: TypeOfEntry.HealthCheck, label: "Health Check" },
];

export const AddEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  // initialValues,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: TypeOfEntry.Hospital,
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        healthCheckRating: 0,
      }}
      // initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidDate = "Date is in invalid format";
        // const errors: { [field: string]: string } = {};
        let errors: FormikErrors<AllEntryFieldsType> = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === TypeOfEntry.Hospital) {
          if (!values.discharge.date) {
            errors = {
              ...errors,
              discharge: { ...errors.discharge, date: requiredError },
            };
          // This is an extremelly basic date validation, just as a placeholder.
          } else if (isNaN(Date.parse(values.discharge.date))) {
            errors = {
              ...errors,
              discharge: { ...errors.discharge, date: invalidDate },
            };
          }
          if (!values.discharge.criteria) {
            errors = {
              ...errors,
              discharge: { ...errors.discharge, criteria: requiredError },
            };
          }
        }
        if (values.type === TypeOfEntry.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }

        // I have disabled the healthCheckRating warning/requirement as the default value is already 0 and therefore it can't be empty.

        // if (values.type === TypeOfEntry.HealthCheck) {
        //   if (!values.healthCheckRating) {
        //     errors.healthCheckRating = requiredError;
        //   }
        // }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Entry Type"
              name="type"
              options={formTypeOptions}
            />

            <TypeFields type={values.type} />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
