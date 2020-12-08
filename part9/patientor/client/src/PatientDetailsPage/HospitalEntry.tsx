import React from "react";
import { HospitalEntryType } from "../types";
import { Icon, Item } from "semantic-ui-react";
import DiagnosesList from './DiagnosesList';


const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  return (
    <Item key={entry.id}>
      <Icon.Group size="huge">
        <Icon name="h square" />
      </Icon.Group>
      <Item.Content>
        <Item.Header as="h5"> {entry.date} </Item.Header>

        {entry.description && (
          <Item.Description>{entry.description}</Item.Description>
        )}

        {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}
      </Item.Content>
    </Item>
  );
};

export default HospitalEntry;
