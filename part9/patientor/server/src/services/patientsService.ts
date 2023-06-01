import { NewPatient, Patient, PatientSafe } from '../types/patientType';
import { v1 as uuid } from 'uuid';
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

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object) {
    const newEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const addNewPatient = (object: unknown): Patient => {
  const newPatient =  {
    ...toNewPatientEntry(object),
    id: uuid(),
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default { getEntriesSafe, addNewPatient };