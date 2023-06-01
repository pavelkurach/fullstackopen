import diagnosesData from '../../data/diagnoses';
import { Diagnose } from '../types/dianoseType';

const getEntries = (): Diagnose[] => {
  return diagnosesData;
};

export default { getEntries };