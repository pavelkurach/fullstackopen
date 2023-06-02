import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types/dianoseType';

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

export default { getEntries };