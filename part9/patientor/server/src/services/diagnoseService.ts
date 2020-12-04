import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnoseData;
};

export default {
  getEntries
};