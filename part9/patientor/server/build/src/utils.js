"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatient = (object) => {
    const newPatientEntry = {
        name: parseString(object.name),
        ssn: parseString(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        occupation: parseString(object.occupation),
        gender: parseGender(object.gender),
    };
    return newPatientEntry;
};
// This is a type guard (checks the type of the parameter).
const isString = (text) => {
    // in principle only one of these two conditions would be needed, but some string creation ways behave differently with respect to typeof and instanceof (for instance, string constructors), so having both is safer.
    return typeof text === 'string' || text instanceof String;
};
const parseString = (stringField) => {
    if (!stringField || !isString(stringField)) {
        throw new Error(`Incorrect or missing stringField: ${stringField}`);
    }
    return stringField;
};
// we can't use a type guard here as the dates in our project are considered strings.
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
exports.default = toNewPatient;
