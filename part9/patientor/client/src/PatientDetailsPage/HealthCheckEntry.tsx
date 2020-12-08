import React from "react";
import { HealthCheckEntryType } from "../types";
import { Icon, Item } from "semantic-ui-react";
import DiagnosesList from './DiagnosesList';


const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {
  const getSemanticUiHealthRatingColor = (healthCheckRating: number) => {
    switch (healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
    }
  };

  return (
    <Item key={entry.id}>
      <Icon.Group size="huge">
        <Icon name="stethoscope" />

        <Icon
          corner="bottom right"
          name="heart"
          color={getSemanticUiHealthRatingColor(entry.healthCheckRating)}
        ></Icon>
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
export default HealthCheckEntry;
