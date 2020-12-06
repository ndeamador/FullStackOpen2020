"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientService_1.default.getEntries());
});
router.get('/:id', (req, res) => {
    res.json(patientService_1.default.getPatient(req.params.id));
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.default(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});
exports.default = router;
