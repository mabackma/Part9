import patientService from "../../services/patients";
import { useParams } from 'react-router-dom';
import { Patient } from "../../types";
import { useState, useEffect } from "react";
import EntryDetails from "../EntryDetails";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams();

  const fetchPatient = async () => {
    if (id) {
      const patient = await patientService.getPatient(id);
      console.log(patient?.entries);
      setPatient(patient);
    }
  };

  useEffect(() => {
    void fetchPatient();
  }, []);

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
              <EntryDetails entry={entry} />
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
