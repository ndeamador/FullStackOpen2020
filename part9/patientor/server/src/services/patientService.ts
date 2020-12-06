import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Omit<PublicPatient, 'ssn'>[] => {
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
    entries: [],
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};


const getPatient = (id: string): Patient | undefined => {
  const foundPatient = patients.find(patient => patient.id === id);

  return foundPatient;
};

export default { getEntries, addPatient, getPatient };