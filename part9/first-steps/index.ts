import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello, Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: 'missing parameters' });
  }
  const heightInCm = Number(height);
  const weightInKg = Number(weight);
  if (isNaN(heightInCm) || isNaN(weightInKg)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(heightInCm, weightInKg);
  res.json({
    weight: weightInKg,
    height: heightInCm,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;
  if (!dailyExercises || !target) {
    res.status(400).json({ error: 'missing parameters' });
  }
  const dailyExerciseHours = (dailyExercises as number[]).map((hours) =>
    Number(hours),
  );
  const targetHours = Number(target);
  if (dailyExerciseHours.some((hours) => isNaN(hours)) || isNaN(targetHours)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  res.json(calculateExercises(dailyExerciseHours, targetHours));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
