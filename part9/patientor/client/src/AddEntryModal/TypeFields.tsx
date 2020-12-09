import React from "react";
import { Header } from "semantic-ui-react";
import { Field } from "formik";

import {
  TextField,
  NumberField,
} from "./FormField";
import {
  TypeOfEntry,
} from "../types";
import { assertNever } from "../utils";

// const healthCheckFormTypeOptions: HealthCheckFormTypeOption[] = [
//   { value: 0, label: "Healthy" },
//   { value: 1, label: "LowRisk" },
//   { value: 2, label: "HighRisk" },
//   { value: 3, label: "CriticalRisk" },
// ];

export const TypeFields: React.FC<{ type: TypeOfEntry }> = ({ type }) => {

  switch (type) {
    case TypeOfEntry.HealthCheck:
      return (
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case TypeOfEntry.Hospital:
      return (
        <div>
          <Header>Discharge details</Header>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </div>
      );
    case TypeOfEntry.OccupationalHealthcare:
      return (
        <div>
          <Field
            label="Employer name"
            placeholder="employer name"
            name="employer-name"
            component={TextField}
          />
          <Header>Sick leave details</Header>
          <Field
            label="Sick leave start date"
            placeholder="YYYY-MM-DD"
            name="sickleave-start"
            component={TextField}
          />
          <Field
            label="Sick leave dnd date"
            placeholder="YYYY-MM-DD"
            name="sickleave-end"
            component={TextField}
          />
        </div>
      );

    default:
      return assertNever(type);
  }
};

export default TypeFields;
