import calculateBmi from './bmiCalculator'
import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});