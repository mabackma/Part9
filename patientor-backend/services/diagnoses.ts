import diagnosisData from '../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosisData;

const getDiagnosisEntries = () => {
  return diagnoses;
};

export default getDiagnosisEntries;