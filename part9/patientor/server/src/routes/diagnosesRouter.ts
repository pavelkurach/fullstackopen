import express, { Router } from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnosesRouter = Router();

diagnosesRouter.get('/', (_req: express.Request, res: express.Response) => {
  const diagnosesData = diagnosesService.getEntries();
  res.json(diagnosesData);
});

export default diagnosesRouter;