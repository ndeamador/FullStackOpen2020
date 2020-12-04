import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getEntries());
});

router.post('/', (req, res) => {

  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const newPatientEntry = patientService.addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender
  });

  res.json(newPatientEntry);
});

export default router;