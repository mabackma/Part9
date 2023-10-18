import patientService from "../../services/patients";
import { useParams } from 'react-router-dom';
import { Patient } from "../../types";
import { useState, useEffect } from "react";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams();

  const fetchPatient = async () => {
    const patient = await patientService.getPatient(id);
    console.log(patient?.entries);
    setPatient(patient)
  };

  useEffect(() => {
    void fetchPatient();
  }, [id]);

  return (
    <div className="App">
      <h2>{patient?.name} {`(${patient?.gender})`}</h2>
      <p>ssn: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>
      <h2>entries</h2>
      <div>
        {patient?.entries.length !== 0 ? (
          patient?.entries.map((entry, index) => (
            <div key={index}>
              <p>{entry.date} <i>{entry.description}</i></p>

              <div>
                {entry.diagnosisCodes?.length !== 0 ? (
                    <ul>
                      {entry.diagnosisCodes?.map((code, index2) => (
                        <li key={index2}>{code}</li>
                      ))}
                    </ul>
                ) : (
                  <p>No diagnostic codes available</p>
                )}
              </div>

            </div>
          ))
        ) : (
          <p>No entries available</p>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
