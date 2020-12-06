import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  return diagnoseData;
};

export default {
  getEntries
};