/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NewPatient, Gender } from './types';

const toNewPatient = (object: any): NewPatient => {
  const newPatientEntry: NewPatient = {
    name: parseString(object.name),
    ssn: parseString(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseString(object.occupation),
    gender: parseGender(object.gender),
  };

  return newPatientEntry;
};

// This is a type guard (checks the type of the parameter).
const isString = (text: any): text is string => {
  // in principle only one of these two conditions would be needed, but some string creation ways behave differently with respect to typeof and instanceof (for instance, string constructors), so having both is safer.
  return typeof text === 'string' || text instanceof String;
};

const parseString = (stringField: any): string => {
  if (!stringField || !isString(stringField)) {
    throw new Error(`Incorrect or missing stringField: ${stringField}`);
  }

  return stringField;
};


// we can't use a type guard here as the dates in our project are considered strings.
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};


const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};




export default toNewPatient;