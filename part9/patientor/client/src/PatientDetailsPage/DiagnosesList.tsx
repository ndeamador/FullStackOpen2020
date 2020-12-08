import React from "react";
import { useStateValue } from "../state";


const DiagnosesList: React.FC<{
  codes: string[];
}> = ({ codes }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <ul>
      {codes
        ? codes.map((code) => (
            <li key={code}>
              {code}
              {diagnoses[code].name}
            </li>
          ))
        : null}
    </ul>
  );
};

export default DiagnosesList;
