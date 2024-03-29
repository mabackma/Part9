import express from 'express';
import getDiagnosisEntries from './services/diagnoses';
import patientService from './services/patients';
import { NewPatientEntry, Gender } from './types';
import cors from 'cors';

const app = express();
app.use(express.json());
const PORT = 3001;

app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  console.log('fetching all diagnoses');
  const diagnoses = getDiagnosisEntries()
  res.send(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  console.log('fetching all patients');
  const patients = patientService.getPatientEntries()
  res.send(patients);
});

app.get('/api/patients/:id', (_req, res) => {
  const { id } = _req.params;
  console.log(`Fetching patient with ID: ${id}`);
  const patient = patientService.getPatientEntry(id)
  res.send(patient);
});

app.post('/api/patients', (req, res) => {
  try {
    const person = req.body as NewPatientEntry;
    const validatedPerson = validatePersonFields(person);

    console.log('creating patient');
    const patient = patientService.newPatient(validatedPerson);
    res.send(patient);
    return;
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const parseField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error('Incorrect or missing field');
  }
  return field;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const validatePersonFields = (person: Record<string, unknown>): NewPatientEntry => {
  // Check each field individually
  const validatedPerson: NewPatientEntry = {
    name: parseField(person.name),
    occupation: parseField(person.occupation),
    gender: parseField(person.gender) as Gender,
    ssn: parseField(person.ssn),
    dateOfBirth: parseField(person.dateOfBirth),
    entries: [],
  };

  return validatedPerson;
};