import patientService from "../../services/patients";
import { useParams } from 'react-router-dom';
import { Patient } from "../../types";
import { useState, useEffect } from "react";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams();

  const fetchPatient = async () => {
    const patient = await patientService.getPatient(id);
    console.log(patient);
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
    </div>
  );
};

export default PatientDetails;
