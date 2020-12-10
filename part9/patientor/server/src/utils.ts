/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  NewPatient,
  Gender,
  NewEntry,
  NewBaseEntry,
  HealthCheckRating,
  TypeOfEntry,
  Discharge,
  SickLeave,
  Diagnosis
} from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatient = (object: any): NewPatient => {
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
    // console.log('inparsestring:', stringField);
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





const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // console.log('healthcheck:', rating, ' - israting?: ',Object.values(HealthCheckRating).includes(rating) );
  // console.log('objectvalues:', Object.values(HealthCheckRating));
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  // console.log('inparsehealthcheck:', rating);
  // We cannot use !rating because a 0 rating would trigger the negation operator
  if (rating === undefined || rating === null || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing HealthCheckRating: ${rating}`);
  }
  return rating;
};


const isEntryType = (type: any): type is TypeOfEntry => {
  // console.log('healthcheck:', type, ' - israting?: ',Object.values(TypeOfEntry).includes(type) );
  // console.log('objectvalues:', Object.values(TypeOfEntry));
  return Object.values(TypeOfEntry).includes(type);
};

const parseEntryType = (type: any): TypeOfEntry => {

  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect or missing entry type: ${type}`);
  }
  return type;
};

// const isDischarge = (params: any): type is Discharge => {
//   return Object.keys(Discharge) === Object.keys(params);
// };



// const parseDischarge = (params: any): Discharge => {
//   if(!params || params.length === 0 || !isDischarge(params))
// };

// const isObject = (params: any): params is Record<string, unknown> => {
const isObject = (params: any): params is object => {
  // null is considered an object, so we have to rule null out.
  return typeof (params) === 'object' && params !== null;
};

// const objectsHaveSameKeys = (object1: any, object2: any): boolean => {
//   // we have to sort the keys to properly compare them
//   const object1keys = Object.keys(object1).sort();
//   const object2keys = Object.keys(object2).sort();

//   return JSON.stringify(object1keys) === JSON.stringify(object2keys);
// }

const isDischarge = (params: any): params is Discharge => {
  // console.log(isObject(params));
  // console.log((params as Discharge).date);
  // console.log((params as Discharge).criteria);

  if (
    isObject(params)
    // && (params as Discharge).date
    && parseString((params as Discharge).date)
    // && (params as Discharge).criteria
    && parseString((params as Discharge).criteria)
  ) {
    return true;
  }
  else {
    return false;
  }
};

const parseDischarge = (params: any): Discharge => {
  if (!params || !isDischarge(params)) {
    throw new Error(`Incorrect or missing Discharge: ${params}`);
  }
  return params;
};



const isSickLeave = (params: any): params is SickLeave => {
  // console.log('inSICKLEAVE');
  // console.log(isObject(params));
  // console.log((params as SickLeave).startDate);
  // console.log((params as SickLeave).endDate);

  if (
    isObject(params)
    // && (params as Discharge).date
    && parseString((params as SickLeave).startDate)
    // && (params as Discharge).criteria
    && parseString((params as SickLeave).endDate)
  ) {
    return true;
  }
  else {
    return false;
  }
};

const parseSickLeave = (params: any): SickLeave => {
  // console.log('inparsesickleave');
  if (!params || !isSickLeave(params)) {
    throw new Error(`Incorrect or missing Sick Leave: ${params}`);
  }
  return params;
};

const isDiagnosesArray = (params: any): params is Array<Diagnosis['code']> => {
  // console.log('inisdiagnosearray');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  params.forEach((code: any) => console.log(code, " - ", isString(code)));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // console.log('every:', params.every((code: any) => isString(code)));
  return Array.isArray(params)  && params.every(code => isString(code));
};

const parseDiagnosisCodes = (params: any): Array<Diagnosis['code']> => {
  // console.log('indiagnosiscodes');
  if (!params || !isDiagnosesArray(params)) {
    throw new Error(`Incorrect or missing Diagnosis: ${params}`);
  }
  return params;
};


export const toNewEntry = (object: any): NewEntry => {

  // console.log('in utils:', object);
  const type = parseEntryType(object.type);

  const newBaseEntry: NewBaseEntry = {
    description: parseString(object.description),
    date: parseString(object.date),
    specialist: parseString(object.specialist),
  };

  // console.log('in utils newentry:', newEntry, 'type:', type);


  if (object.diagnosisCodes) newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);

  switch (type) {
    case TypeOfEntry.HealthCheckEntry:
      return {
        ...newBaseEntry,
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case TypeOfEntry.OccupationalHealthcareEntry:
      const containsSickleave: boolean = object.sickLeave ? true : false;
      // console.log('containsSickleave:', containsSickleave);
      // console.log('employer:', );

      return {
        ...newBaseEntry,
        type,
        employerName: parseString(object.employerName),
        ...(containsSickleave &&
        {
          // sickLeave: {
          //   startDate: parseString(object.sickLeave.startDate),
          //   endDate: parseString(object.sickLeave.endDate),
          // }

          sickLeave: parseSickLeave(object.sickLeave)
        })
      }


      ;
    case TypeOfEntry.HospitalEntry:
      // const discharge: Discharge = parseDischarge(object.discharge);
      // if (!discharge)  throw new Error(`Incorrect or missing Discharge: ${params}`);

      return {
        ...newBaseEntry,
        type,
        // discharge: {
        //   date: parseString(object.discharge.date),
        //   criteria: parseString(object.discharge.criteria),
        // }
        discharge: parseDischarge(object.discharge)
      };
    default:
      return assertNever(type);
  }
};