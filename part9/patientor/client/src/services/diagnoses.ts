import { Diagnosis } from '../types';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/diagnoses';

const getAll = async (): Promise<Diagnosis[]> => {
  const response = await axios.get<Diagnosis[]>(baseUrl);
  return response.data;
};

export default { getAll };