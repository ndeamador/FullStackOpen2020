"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: uuid_1.v4(), entries: [] }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const getPatient = (id) => {
    const foundPatient = patients_1.default.find(patient => patient.id === id);
    return foundPatient;
};
exports.default = { getEntries, addPatient, getPatient };