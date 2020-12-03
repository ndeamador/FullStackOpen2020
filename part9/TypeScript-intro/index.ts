import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  try {
    if (!isNaN(height) && !isNaN(weight)) {
      res.send({
        weight,
        height,
        bmi: calculateBmi(height, weight)
      });
    }
    else {
      throw new Error('malformatted parameters')
    }
  } catch (err) {
    res.send({
      error: err.message
    });
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});