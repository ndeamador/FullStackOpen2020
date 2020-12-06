import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import axios from "axios";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";

import { Container, Header, Icon } from "semantic-ui-react";

const PatientDetailsPage: React.FC = () => {
  const [{ patients, individuallyFetchedPatients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
  // const [error, setError] = React.useState<string | undefined>();

  const fetchPatient = async (id: string) => {
    console.log("IN FETCH ===========================");
    console.log("indis:", individuallyFetchedPatients);
    console.log("id:", id);
    console.log("includes?:", individuallyFetchedPatients.includes(id));

    try {
      if (!individuallyFetchedPatients.includes(id)) {
        console.log("-------------fetch inside if");

        const response = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(response.data);
        dispatch({ type: "UPDATE_PATIENT", payload: response.data });
        dispatch({ type: "ADD_FETCHED_PATIENT_ID", payload: response.data.id });
      } else {
        setPatient(patients[id]);
      }
    } catch (e) {
      console.error(e.response.data);
      // setError(e.response.data.error);
    }
  };

  useEffect(() => {
    console.log("in useeffect");
    const patientsLoaded = Object.keys(patients).length > 0;
    if (patientsLoaded) fetchPatient(id);
  }, [patients, id]);

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

  return (
    <Container>
      <Header>
        {patient.name}
        <Icon name={getSemanticUiGender(patient.gender)} />
      </Header>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </Container>
  );
};

export default PatientDetailsPage;
