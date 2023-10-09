import patientData from '../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData as Patient[];

const getPatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const newPatient = (person: NewPatientEntry): Patient => {
  const id: string = uuid()
  const newPatientData: Patient = {
    id,
    ...person,
  };

  // Add the new patient to the patients array
  patients.push(newPatientData);

  return newPatientData;
}

export default { getPatientEntries, newPatient };