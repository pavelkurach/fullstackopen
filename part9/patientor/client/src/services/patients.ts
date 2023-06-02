import axios from 'axios';
import { Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async (): Promise<Patient[]> => {
  const data = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data.data;
};

const getById = async (id: string): Promise<Patient | undefined> => {
  const patient= await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return patient.data;
};

const create = async (object: PatientFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getById,
};

