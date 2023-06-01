import { Router } from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
  const patientsSafe = patientsService.getEntriesSafe();
  res.json(patientsSafe);
});

export default patientsRouter;