import express from 'express';
import cors from 'cors';
import pingRouter from './routes/pingRouter';
import diagnosesRouter from './routes/diagnosesRouter';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

