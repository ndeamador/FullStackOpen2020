import { State } from "./state";
import { Patient, Diagnosis } from "../types";

// Actions
export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_FETCHED_PATIENT_ID";
    payload: string;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  };


// Action creators

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const updatePatient = (updatedPatient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: updatedPatient
  };
};

export const addFetchedPatientId = (id: string): Action => {
  return {
    type: "ADD_FETCHED_PATIENT_ID",
    payload: id
  };
};

export const setDiagnosisList = (diagnosesList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosesList
  };
};




// Reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "UPDATE_PATIENT":
      // console.log('in reducer update', state);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "ADD_FETCHED_PATIENT_ID":
      // console.log('in reducer state', state.individuallyFetchedPatients);
      // console.log('in reducer action', action.payload);

      // It seems that in some cases the reducer gets called twice, so I include this condition to avoid duplicate keys:
      if (state.individuallyFetchedPatients.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        individuallyFetchedPatients: state.individuallyFetchedPatients.concat(action.payload)
      };

    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };

    default:
      return state;
  }
};
