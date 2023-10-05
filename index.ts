import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import express from 'express';
const app = express();
import bodyParser from 'body-parser';

// Parse JSON data when posting exercise data
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: string = req.query.height as string;
  const weight: string = req.query.weight as string;

  if (!height || !weight) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  const numericHeight = Number(height);
  const numericWeight = Number(weight);

  if (isNaN(numericHeight) || isNaN(numericWeight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(numericHeight, numericWeight);

  const jsonString = `{\n  weight: ${weight},\n  height: ${height},\n  bmi: "${bmi}"\n}`;
  res.type('json').send(jsonString);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (!Array.isArray(daily_exercises) ||  !daily_exercises.every((value) => typeof value === "number") || typeof target !== "number") {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exerciseResult = calculateExercises(daily_exercises, target);
  res.json(exerciseResult);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});