import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (!isNaN(height) && !isNaN(weight)) {
      res.send({
        weight,
        height,
        bmi: calculateBmi(height, weight)
      });
    }
    else {
      throw new Error('malformatted parameters');
    }
  } catch (err) {

    if (err instanceof Error) {
      res.send({
        error: err.message
      });
    } else {
      res.send({
        error: 'The argument passed to the error handler is not of type Error'
      });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});