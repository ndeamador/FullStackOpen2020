
import patients from '../../data/patients';
import { Patient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {

  const newPatient = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, addPatient };