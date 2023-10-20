import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, Entry, HealthCheckRating } from "../../types";

const entryContainer = {
  border: '2px solid #000', 
  padding: '10px', 
  margin: '10px 0', 
}

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  const getDiagnoses = async () => {
    const diagnoses = await diagnosisService.getAll();
    setDiagnoses(diagnoses);
  }

  useEffect(() => {
    void getDiagnoses();
  }, []);

  const checkType = (): string => {
    switch (entry.type) {
      case "HealthCheck":
        return "Health check"
      case "Hospital":
        return "Hospital"
      case "OccupationalHealthcare":
        return `${entry.employerName}`
    }
  }

  const diagnosisName = (code: string): string => {
    if (diagnoses) {
      const diagnosis = diagnoses.find(d => d.code === code);
      if (diagnosis) {
        return diagnosis.name;
      }
    }
    return "No name for diagnosis";
  }

  return (
    <div style={entryContainer}>
      <><b>{entry.date}:</b> {checkType()}</><br></br>
      <i>{entry.description}</i>

      {entry.diagnosisCodes ? (
        <div>
        <h4>diagnoses:</h4>
          <ul>
            {entry.diagnosisCodes?.map((code, index2) => (
              <li key={index2}><b>{code}</b> {diagnosisName(code)}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {(entry.type === "HealthCheck" || entry.type === "OccupationalHealthcare") && entry.hasOwnProperty('healthCheckRating') ? (
        <>
          <br />
            <b>Health:</b> {HealthCheckRating[entry.healthCheckRating]}
          <br />
        </>
      ) : <br></br>}

      <><b>Diagnose by:</b> {entry.specialist}</>
    </div>
  );
};
  
export default EntryDetails;