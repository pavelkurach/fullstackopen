import { Router } from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
  const patientsSafe = patientsService.getEntriesSafe();
  res.json(patientsSafe);
});

patientsRouter.post('/', (req, res) => {
  const patientToAdd: unknown = req.body;
  const newPatient = patientsService.addNewPatient(patientToAdd);
  res.json(newPatient);
});

export default patientsRouter;