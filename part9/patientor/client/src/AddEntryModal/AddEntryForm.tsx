import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  SelectField,
  formTypeOption,
  DiagnosisSelection,
} from "./FormField";
import { NewEntry, TypeOfEntry } from "../types";
import TypeFields from "./TypeFields";

import { useStateValue } from "../state";


export type EntryFormValues = NewEntry;

interface Props {
  onSubmit: (values: NewEntry) => void;
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
        // employerName: "",
        // sickLeave: {
        //   startDate: "",
        //   endDate: "",
        // },
        // healthCheckRating: 0,
      }}
      // initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type === TypeOfEntry.Hospital) {
          // if (!values.discharge) {
          //   errors.type = requiredError;
          // }
          if (!values.discharge.date) {
            console.log('en discharge');
            errors.type = requiredError;
          }
          if (!values.discharge.criteria) {
            console.log('en criteria');
            errors.type = requiredError;
          }
        }
        if (values.type === TypeOfEntry.OccupationalHealthcare) {
          if (!values.employerName) {
            console.log('en employername');

            errors.type = requiredError;
          }
          if (values.sickLeave) {
            if (!values.sickLeave.endDate) {
              console.log('en sickend');

              errors.type = requiredError;
            }
            if (!values.sickLeave.startDate) {
              console.log('en sickstart');

              errors.type = requiredError;
            }
          }
        }
        if (values.type === TypeOfEntry.HealthCheck) {
          console.log('en healthcheck');

          if (!values.healthCheckRating) {
            errors.type = requiredError;
          }
        }
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
            {console.log(values)}
            {console.log("typeoftype:", typeof values.type)}

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
