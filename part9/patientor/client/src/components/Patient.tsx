import { useParams } from 'react-router-dom';
import patientsService from '../services/patients';
import { Patient } from '../types';
import { useEffect, useState } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientComponent = () => {
  const id = useParams().id as string;
  const [patient, setPatient] = useState<Patient>();

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
          <div>
            <i>{entry.date}</i> {entry.description}
            <ul>
              {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
                return (
                  <li key={code}>{code}</li>
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