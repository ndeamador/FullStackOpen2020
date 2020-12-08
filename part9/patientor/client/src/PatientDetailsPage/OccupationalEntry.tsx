import React from "react";
import { OccupationalHealthcareEntryType } from "../types";
import { Icon, Item } from "semantic-ui-react";
import DiagnosesList from "./DiagnosesList";

const OccupationalEntry: React.FC<{
  entry: OccupationalHealthcareEntryType;
}> = ({ entry }) => {
  return (
    <Item key={entry.id}>
      <Icon.Group size="huge">
        <Icon name="user md" />
      </Icon.Group>
      <Item.Content>
        <Item.Header as="h5"> {entry.date} {entry.employerName && <strong> - {entry.employerName}</strong>}</Item.Header>

        {entry.description && (
          <Item.Description>{entry.description}</Item.Description>
        )}

        {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}

      </Item.Content>
    </Item>
  );
};

export default OccupationalEntry;