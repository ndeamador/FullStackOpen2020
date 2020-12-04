import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnoseData;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};