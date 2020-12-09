import React from "react";
import { Entry, TypeOfEntry } from "../types";
import { assertNever } from "../utils";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalEntry from "./OccupationalEntry";

// const getSemanticUiEntryType = (entryType: string) => {
//   switch (entryType) {
//     case "Hospital":
//       return "h square";
//     case "HealthCheck":
//       return "stethoscope";
//     case "OccupationalHealthcare":
//       return "user md";
//   }
// };

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case TypeOfEntry.Hospital:
      // case "Hospital":
      return <HospitalEntry entry={entry} />;
    // case "HealthCheck":
    case TypeOfEntry.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    // case "OccupationalHealthcare":
    case TypeOfEntry.OccupationalHealthcare:
      return <OccupationalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
