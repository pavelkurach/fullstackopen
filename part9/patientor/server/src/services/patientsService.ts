import { Patient, PatientSafe } from '../types/patientType';
import patientsData from '../../data/patients';

const convertPatientToSafe = (patient: Patient): PatientSafe => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  };
};

const getEntriesSafe = (): PatientSafe[] => {
  return patientsData.map(patient => convertPatientToSafe(patient));
};

export default { getEntriesSafe };