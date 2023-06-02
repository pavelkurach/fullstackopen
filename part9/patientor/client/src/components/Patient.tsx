import { useParams } from 'react-router-dom';
import patientsService from '../services/patients';
import { Patient } from '../types';
import { useEffect, useState } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import {Diagnosis} from '../types';
import diagnosesService from '../services/diagnoses'
import {useQuery} from 'react-query';

const PatientComponent = () => {
  const id = useParams().id as string;
  const [patient, setPatient] = useState<Patient>();

  const diagnosesQuery = useQuery('diagnoses', diagnosesService.getAll)
  const diagnoses = diagnosesQuery.data === undefined
    ? []
    : diagnosesQuery.data

  useEffect(() => {
    patientsService.getById(id).then(patient => {
      setPatient(patient);
    });
  });

  if (typeof patient === 'undefined') {
    return (
      <div>
        wrong id
      </div>
    );
  }
  return (
    <div>
      <h1>
        {patient.name}
        {patient.gender === 'male'
          ? <MaleIcon />
          : patient.gender === 'female'
            ? <FemaleIcon />
            : ''
        }
      </h1>
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}
      <h2>Entries</h2>
      {patient.entries.map(entry => {
        return (
          <div key={entry.id}>
            <i>{entry.date}</i> {entry.description}
            <ul>
              {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
                return (
                  <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  );
};

export default PatientComponent;