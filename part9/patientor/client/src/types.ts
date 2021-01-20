export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntryType extends BaseEntry {
  // type: "HealthCheck";
  type: TypeOfEntry.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntryType extends BaseEntry {
  type: TypeOfEntry.OccupationalHealthcare;
  // type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntryType extends BaseEntry {
  type: TypeOfEntry.Hospital;
  // type: "Hospital";
  discharge: Discharge;
}

// Trying a workaround including all the conditional entry fields to pass as Formik's initial values
export interface AllEntryFields extends BaseEntry {
  type: TypeOfEntry;
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeave?: SickLeave;
  discharge: Discharge;
}
export type AllEntryFieldsType = Omit<AllEntryFields, 'id'>;

// Added 'type' to the type names to avoid conflicts with the components using the same name.
export type Entry =
  | HospitalEntryType
  | OccupationalHealthcareEntryType
  | HealthCheckEntryType;

export enum TypeOfEntry {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export type NewEntry = Omit<HospitalEntryType, 'id'> | Omit<OccupationalHealthcareEntryType, 'id'> | Omit<HealthCheckEntryType, 'id'>;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;