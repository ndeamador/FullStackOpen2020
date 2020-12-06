import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addFetchedPatientId, updatePatient } from "../state";
import axios from "axios";
import { Patient, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";

import { Container, Header, Icon } from "semantic-ui-react";

const PatientDetailsPage: React.FC = () => {
  const [{ patients, individuallyFetchedPatients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
  // const [error, setError] = React.useState<string | undefined>();

  const fetchPatient = async (id: string) => {
    // console.log("IN FETCH ===========================");
    // console.log("indis:", individuallyFetchedPatients);
    // console.log("id:", id);
    // console.log("includes?:", individuallyFetchedPatients.includes(id));

    try {
      if (!individuallyFetchedPatients.includes(id)) {
        // console.log("-------------fetch inside if");

        const response = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(response.data);
        // dispatch({ type: "UPDATE_PATIENT", payload: response.data });
        // dispatch({ type: "ADD_FETCHED_PATIENT_ID", payload: response.data.id });
        dispatch(updatePatient(response.data));
        dispatch(addFetchedPatientId(response.data.id));
      } else {
        setPatient(patients[id]);
      }
    } catch (e) {
      console.error(e.response.data);
      // setError(e.response.data.error);
    }
  };

  useEffect(() => {
    // console.log("in useeffect");
    const patientsLoaded = Object.keys(patients).length > 0;
    if (patientsLoaded) fetchPatient(id);
  }, [patients, id, dispatch]);

  if (!patient) return <div>Patient not found.</div>;

  const getSemanticUiGender = (gender: Gender) => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      case "other":
        return "genderless";
    }
  };

  const displayEntries = (entries: Entry[]) => {
    if (entries.length === 0) {
      return null;
    }


    return (
      <div style={{margin: 20}}>
        <h4>entries</h4>
        {entries.map((entry) => (
          <div key={entry.id}>
            <div>
              {entry.date} {entry.description ? entry.description : null}
            </div>
            <ul>
              {entry.diagnosisCodes
                ? entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)
                : null}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Container>
      <Header>
        {patient.name}
        <Icon name={getSemanticUiGender(patient.gender)} />
      </Header>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {displayEntries(patient.entries)}
    </Container>
  );
};

export default PatientDetailsPage;
