import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (!isNaN(height) && !isNaN(weight)) {
      res.json({
        weight,
        height,
        bmi: calculateBmi(height, weight)
      });
    }
    else {
      throw new Error('malformatted parameters');
    }
  }
  catch (err) {
    if (err instanceof Error) {
      res.json({
        error: err.message
      });
    } else {
      res.json({
        error: 'The argument passed to the error handler is not of type Error'
      });
    }
  }
});

app.post('/exercises', (req, res) => {

  // The body is parsed by the express.json middleware above, so I don't convert the request from string to numbers.
  const { target, daily_exercises } = req.body as {
    target: number,
    daily_exercises: Array<number>
  };

  if (!target || !daily_exercises) res.json({ error: "parameters missing" });

  const allNumbers = !isNaN(target) && daily_exercises.every(item => !isNaN(item));

  if (!allNumbers || !Array.isArray(daily_exercises)) res.json({ error: "malformatted parameters" });

  try {
    res.json(calculateExercises(target, [...daily_exercises]));
  }
  catch (err) {
    if (err instanceof Error) {
      res.json({
        error: err.message
      });
    } else {
      res.json({
        error: 'The argument passed to the error handler is not of type Error'
      });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});