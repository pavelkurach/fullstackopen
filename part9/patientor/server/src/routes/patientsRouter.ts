import { Router } from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
  const patientsSafe = patientsService.getEntriesSafe();
  res.json(patientsSafe);
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getEntry(id)
  if (typeof patient === 'undefined') {
    return res.status(400).end()
  }
  return res.json(patientsService.getEntry(id));
})

patientsRouter.post('/', (req, res) => {
  const patientToAdd: unknown = req.body;
  const newPatient = patientsService.addNewPatient(patientToAdd);
  res.json(newPatient);
});

export default patientsRouter;