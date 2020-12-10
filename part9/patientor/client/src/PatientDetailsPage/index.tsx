import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addFetchedPatientId, updatePatient, addEntry } from "../state";
import axios from "axios";
import { Patient, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";

import { Container, Header, Icon, Item, Divider, Button } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";

import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';


const PatientDetailsPage: React.FC = () => {
  const [{ patients, individuallyFetchedPatients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [error, setError] = React.useState<string | undefined>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log('submitnewentry values:', values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      // dispatch({ type: "ADD_PATIENT", payload: newPatient });
      dispatch(addEntry(newEntry, id));

      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  // const submitNewEntry = () => {
  //   console.log('SUBMIT NEW ENTRY');
  // };

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
      <Container style={{ margin: 20 }}>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="ambulance" />
            Entries
          </Header>
        </Divider>

        <Item.Group divided>
          {entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </Item.Group>
      </Container>
    );
  };

  return (
    <Container>
      <Header as="h3">
        {patient.name}
        <Icon name={getSemanticUiGender(patient.gender)} />
      </Header>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {displayEntries(patient.entries)}


      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
  );
};

export default PatientDetailsPage;
